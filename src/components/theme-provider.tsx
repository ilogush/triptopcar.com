"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

interface Props extends ThemeProviderProps {
  children: React.ReactNode; // Явно указываем, что будет передаваться свойство `children`
}

export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
