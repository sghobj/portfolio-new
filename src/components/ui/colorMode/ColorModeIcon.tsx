import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode } from "./useColorMode";

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}
