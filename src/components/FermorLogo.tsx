import { useState } from "react";
import logoImg from "../assets/logo.png";

interface FermorLogoProps {
  className?: string;
  size?: number;
}

export function FermorLogo({ className = "w-8 h-8", size = 32 }: FermorLogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm ${className}`}
        aria-label="Fermor Logo"
      >
        {/* Geometric Monogram Emblem */}
        <svg
          viewBox="0 0 32 32"
          width={size * 0.75}
          height={size * 0.75}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 6H24V11H14V14H22V19H14V26H8V6Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={logoImg}
      alt="Fermor Logo"
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      style={{ width: size, height: size }}
      className={`rounded-lg object-contain shrink-0 border border-white/10 transition-colors ${className}`}
    />
  );
}
