"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Loader } from "@/components/atoms/loader";
import { cn } from "@/utils/cn";

interface LoadingLayoutProps {
  children: ReactNode;
  duration?: number;
  fadeDuration?: number;
  className?: string;
}

export function LoadingLayout({
  children,
  duration = 1500,
  fadeDuration = 500,
  className,
}: LoadingLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start fading the loader
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      setShowContent(true);
    }, duration);

    // Remove loader completely
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, duration + fadeDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, fadeDuration]);

  return (
    <>
      {/* Loader overlay */}
      {isLoading && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity dark:bg-black",
            isFading ? "opacity-0 pointer-events-none" : "opacity-100",
            className,
          )}
          style={{ transitionDuration: `${fadeDuration}ms` }}
        >
          <Loader />
        </div>
      )}

      {/* Content - only rendered when showContent is true */}
      {showContent && (
        <div
          className="animate-fade-in"
          style={{ animationDuration: `${fadeDuration}ms` }}
        >
          {children}
        </div>
      )}
    </>
  );
}
