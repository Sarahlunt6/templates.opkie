"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

export interface PremiumVideoPlayerProps {
  src?: string;
  poster: string;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  aspectRatio?: "video" | "cinematic" | "square";
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export interface PremiumVideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  toggleMute: () => void;
}

const PremiumVideoPlayer = forwardRef<PremiumVideoPlayerRef, PremiumVideoPlayerProps>(
  (
    {
      src,
      poster,
      title,
      subtitle,
      autoPlay = true,
      muted: initialMuted = true,
      loop = true,
      className = "",
      aspectRatio = "video",
      onPlay,
      onPause,
      onEnded,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(initialMuted);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [progress, setProgress] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [showPoster, setShowPoster] = useState(true);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);

    const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

    // Motion values for smooth progress bar
    const progressMotion = useMotionValue(0);
    const progressWidth = useTransform(progressMotion, [0, 100], ["0%", "100%"]);

    // Aspect ratio classes
    const aspectClasses = {
      video: "aspect-video",
      cinematic: "aspect-[21/9]",
      square: "aspect-square",
    };

    // Format time display
    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seek: (time: number) => {
        if (videoRef.current) videoRef.current.currentTime = time;
      },
      toggleMute: () => {
        if (videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted;
          setIsMuted(!isMuted);
        }
      },
    }));

    // Auto-hide controls
    const resetHideTimeout = useCallback(() => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      setShowControls(true);
      hideControlsTimeout.current = setTimeout(() => {
        if (isPlaying && !isDragging) {
          setShowControls(false);
        }
      }, 3000);
    }, [isPlaying, isDragging]);

    // Play/Pause toggle
    const togglePlay = useCallback(() => {
      if (!videoRef.current || !src) return;

      if (isPlaying) {
        videoRef.current.pause();
      } else {
        setShowPoster(false);
        videoRef.current.play();
      }
    }, [isPlaying, src]);

    // Mute toggle
    const toggleMute = useCallback(() => {
      if (!videoRef.current) return;
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(videoRef.current.volume || 1);
      }
    }, [isMuted]);

    // Volume change
    const handleVolumeChange = useCallback((newVolume: number) => {
      if (!videoRef.current) return;
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }, []);

    // Progress bar click/drag
    const handleProgressInteraction = useCallback(
      (e: React.MouseEvent | MouseEvent) => {
        if (!progressRef.current || !videoRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = pos * duration;

        videoRef.current.currentTime = newTime;
        setProgress(pos * 100);
        progressMotion.set(pos * 100);
      },
      [duration, progressMotion]
    );

    // Fullscreen toggle
    const toggleFullscreen = useCallback(() => {
      if (!containerRef.current) return;

      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }, []);

    // Video event handlers
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handlePlay = () => {
        setIsPlaying(true);
        onPlay?.();
      };

      const handlePause = () => {
        setIsPlaying(false);
        onPause?.();
      };

      const handleEnded = () => {
        setIsPlaying(false);
        onEnded?.();
      };

      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        setIsLoaded(true);
      };

      const handleTimeUpdate = () => {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
        setCurrentTime(video.currentTime);
        if (!isDragging) {
          progressMotion.set(currentProgress);
        }
      };

      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          setBuffered((bufferedEnd / video.duration) * 100);
        }
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("ended", handleEnded);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("progress", handleProgress);

      // Auto-play handling
      if (autoPlay && src) {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {
          // Autoplay was prevented
        });
      }

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("progress", handleProgress);
      };
    }, [autoPlay, src, onPlay, onPause, onEnded, isDragging, progressMotion]);

    // Mouse drag for progress
    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        handleProgressInteraction(e);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, handleProgressInteraction]);

    // Fullscreen change listener
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
      };
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (hideControlsTimeout.current) {
          clearTimeout(hideControlsTimeout.current);
        }
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={`
          relative overflow-hidden bg-slate-900 group
          ${aspectClasses[aspectRatio]}
          ${className}
        `}
        onMouseMove={resetHideTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Element */}
        {src && (
          <video
            ref={videoRef}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-700
              ${showPoster ? "opacity-0" : "opacity-100"}
            `}
            playsInline
            loop={loop}
            muted={isMuted}
            preload="metadata"
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}

        {/* Poster Image Fallback */}
        <AnimatePresence>
          {(showPoster || !src) && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={poster}
                alt={title || "Video thumbnail"}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play Button Overlay (when paused) */}
        <AnimatePresence>
          {(!isPlaying || showPoster) && src && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={togglePlay}
              className="
                absolute inset-0 z-20 flex items-center justify-center
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
              "
              aria-label="Play video"
            >
              <motion.div
                className="
                  w-20 h-20 md:w-24 md:h-24 rounded-full
                  bg-white/20 backdrop-blur-sm
                  flex items-center justify-center
                  border border-white/30
                "
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
              </motion.div>

              {/* Title & Subtitle */}
              {(title || subtitle) && (
                <div className="absolute bottom-8 left-8 text-left">
                  {subtitle && (
                    <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-2">
                      {subtitle}
                    </p>
                  )}
                  {title && (
                    <h3 className="text-white text-xl md:text-2xl font-light tracking-wide">
                      {title}
                    </h3>
                  )}
                </div>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Custom Controls Overlay */}
        <AnimatePresence>
          {showControls && isLoaded && src && !showPoster && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-30 flex flex-col justify-end"
            >
              {/* Gradient for controls visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Controls Container */}
              <div className="relative px-4 md:px-6 pb-4 md:pb-6 space-y-3">
                {/* Progress Bar */}
                <div
                  ref={progressRef}
                  className="relative h-1 group/progress cursor-pointer"
                  onClick={handleProgressInteraction}
                  onMouseDown={(e) => {
                    setIsDragging(true);
                    handleProgressInteraction(e);
                  }}
                >
                  {/* Track Background */}
                  <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
                    {/* Buffered */}
                    <div
                      className="absolute inset-y-0 left-0 bg-white/30 rounded-full transition-all"
                      style={{ width: `${buffered}%` }}
                    />
                    {/* Progress */}
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-white rounded-full"
                      style={{ width: progressWidth }}
                    />
                  </div>

                  {/* Hover expansion */}
                  <div className="absolute inset-0 -my-1 group-hover/progress:scale-y-150 transition-transform origin-center" />

                  {/* Scrubber Handle */}
                  <motion.div
                    className="
                      absolute top-1/2 -translate-y-1/2 w-3 h-3
                      bg-white rounded-full shadow-lg
                      opacity-0 group-hover/progress:opacity-100
                      transition-opacity duration-200
                    "
                    style={{ left: progressWidth }}
                    animate={{ scale: isDragging ? 1.3 : 1 }}
                  />
                </div>

                {/* Control Buttons Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="
                        w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                        flex items-center justify-center
                        hover:bg-white/20 transition-colors
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                      "
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>

                    {/* Volume */}
                    <div
                      className="relative flex items-center"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <button
                        onClick={toggleMute}
                        className="
                          w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                          flex items-center justify-center
                          hover:bg-white/20 transition-colors
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                        "
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </button>

                      {/* Volume Slider */}
                      <AnimatePresence>
                        {showVolumeSlider && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 80 }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-2 flex items-center overflow-hidden"
                          >
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={volume}
                              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                              className="
                                w-full h-1 appearance-none bg-white/30 rounded-full
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-3
                                [&::-webkit-slider-thumb]:h-3
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-white
                                [&::-webkit-slider-thumb]:cursor-pointer
                              "
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Time Display */}
                    <span className="text-white/80 text-xs md:text-sm font-light tracking-wider tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="
                      w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                      flex items-center justify-center
                      hover:bg-white/20 transition-colors
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                    "
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-4 h-4 text-white" />
                    ) : (
                      <Maximize className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click to toggle play (when playing) */}
        {isPlaying && !showControls && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 z-20 cursor-pointer focus:outline-none"
            aria-label="Pause video"
          />
        )}
      </div>
    );
  }
);

PremiumVideoPlayer.displayName = "PremiumVideoPlayer";

export default PremiumVideoPlayer;
