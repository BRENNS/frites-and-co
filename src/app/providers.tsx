"use client";

import { I18nProvider } from "@/i18n";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <I18nProvider>{children}</I18nProvider>;
}
