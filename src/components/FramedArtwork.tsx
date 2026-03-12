import { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

interface FramedArtworkProps {
  src: string;
  alt: string;
  className?: string;
  enableTilt?: boolean;
  onClick?: () => void;
}

const FramedArtwork = ({ src, alt, className = "", enableTilt = false, onClick }: FramedArtworkProps) => {
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

  return (
    <div
      ref={tiltRef}
      className={`frame-artwork cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block"
        loading="lazy"
      />
    </div>
  );
};

export default FramedArtwork;
