"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  /** Pause when the layer scrolls out of view (saves battery on mobile). */
  pauseOffscreen?: boolean;
};

type Status = "idle" | "playing" | "blocked" | "skipped";

/**
 * Autoplaying background video that survives the platforms that fight it.
 *
 * The rules we are working around:
 *  - iOS/Safari only autoplay video that is muted AND `playsinline`, and the
 *    attributes must exist on the element *before* the first play attempt, so we
 *    set them imperatively on the ref rather than trusting React's attribute pass.
 *  - iOS Low Power Mode refuses autoplay outright, and `play()` rejects. There is
 *    no way to detect it up front, so we listen for the first real user gesture
 *    and retry once — and until then the poster layer underneath carries the design.
 *  - Safari suspends decoding on tab blur / bfcache restore; `visibilitychange`
 *    and `pageshow` kick it back to life.
 *  - Reduced-motion and Save-Data users never get the video at all.
 */
export default function BackgroundVideo({
  src,
  poster,
  className = "",
  pauseOffscreen = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const visibleRef = useRef(true);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !visibleRef.current) return;
    try {
      await video.play();
      setStatus("playing");
    } catch {
      setStatus((s) => (s === "playing" ? s : "blocked"));
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (reduced || conn?.saveData) {
      setStatus("skipped");
      return;
    }

    // Must be set on the element itself — Safari reads these at load time.
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const onPlaying = () => setStatus("playing");
    const onWaiting = () => void attemptPlay();
    video.addEventListener("playing", onPlaying);
    video.addEventListener("loadeddata", onWaiting);
    video.addEventListener("canplay", onWaiting);

    void attemptPlay();

    // First gesture of any kind is our second chance on locked-down devices.
    const gestures: (keyof DocumentEventMap)[] = [
      "touchstart",
      "pointerdown",
      "click",
      "keydown",
      "scroll",
    ];
    const onGesture = () => void attemptPlay();
    gestures.forEach((g) =>
      document.addEventListener(g, onGesture, { passive: true })
    );

    const onVisibility = () => {
      if (document.visibilityState === "visible") void attemptPlay();
    };
    const onPageShow = () => void attemptPlay();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("loadeddata", onWaiting);
      video.removeEventListener("canplay", onWaiting);
      gestures.forEach((g) => document.removeEventListener(g, onGesture));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [attemptPlay]);

  useEffect(() => {
    if (!pauseOffscreen) return;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) void attemptPlay();
        else if (!video.paused) video.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [attemptPlay, pauseOffscreen]);

  const showVideo = status === "playing";

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Poster layer: always painted, so a blocked or still-loading video never
          leaves a black hole. It drifts slowly when the video can't run. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          showVideo ? "opacity-0" : "opacity-100"
        } ${status === "blocked" || status === "skipped" ? "poster-drift" : ""}`}
        style={{ backgroundImage: `url(${poster})` }}
      />

      {status !== "skipped" && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
