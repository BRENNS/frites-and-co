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
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration + fadeDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, fadeDuration]);

  return (
    <div className={"bg-white"}>
      {isVisible && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity dark:bg-black",
            isFading ? "opacity-0" : "opacity-100",
            className,
          )}
          style={{ transitionDuration: `${fadeDuration}ms` }}
        >
          <Loader />
        </div>
      )}
      {children}
    </div>
  );
}
