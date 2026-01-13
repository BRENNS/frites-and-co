"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/utils/cn";

interface LoaderProps {
  className?: string;
}

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cn("size-64", className)}>
      <DotLottieReact
        src="https://lottie.host/0af9d3f5-3f2c-41ac-bcd3-b43ee9869a31/TTGD3Gb1m4.lottie"
        loop
        autoplay
      />
    </div>
  );
}
