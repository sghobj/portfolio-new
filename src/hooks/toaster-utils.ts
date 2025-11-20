// src/components/ui/toaster-utils.ts
import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});
