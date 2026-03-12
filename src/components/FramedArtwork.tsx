"use client";

import { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import { cn } from "@/lib/utils";

interface FramedArtworkProps {
  src: string;
  alt: string;
  className?: string;
  enableTilt?: boolean;
  onClick?: () => void;
  variant?: "default" | "wood" | "minimal";
  large?: boolean;
}

const FramedArtwork = ({ 
  src, 
  alt, 
  className = "", 
  enableTilt = false, 
  onClick,
  variant = "default",
  large = false
}: FramedArtworkProps) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enableTilt && tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 8,
        perspective: 1500,
        speed: 400,
        glare: false,
      });
    }

    return () => {
      if (tiltRef.current && (tiltRef.current as any).vanillaTilt) {
        (tiltRef.current as any).vanillaTilt.destroy();
      }
    };
  }, [enableTilt]);

  // Frame styles
  const frameStyles = {
    default: "bg-background shadow-[var(--shadow-frame)]",
    wood: `
      bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950
      p-3 md:p-4 lg:p-5
      shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_20px_rgba(0,0,0,0.15),0_12px_40px_rgba(0,0,0,0.1)]
      ring-1 ring-amber-950/30
    `,
    minimal: "bg-background border border-border/50",
  };

  return (
    <div
      ref={tiltRef}
      className={cn(
        "cursor-pointer transition-all duration-300 flex items-center justify-center overflow-hidden",
        frameStyles[variant],
        large ? "p-4 md:p-6 lg:p-8" : "",
        className
      )}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "max-w-full max-h-full w-auto h-auto block object-contain",
          variant === "wood" && "ring-1 ring-black/5"
        )}
        loading="lazy"
      />
    </div>
  );
};

export default FramedArtwork;
