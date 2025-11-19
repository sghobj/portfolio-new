"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      {...props}
      forcedTheme="light" // or use defaultTheme="light" if you want dynamic switching
    />
  );
}
