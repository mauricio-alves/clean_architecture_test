import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      expand
      richColors
      duration={6000}
      closeButton
    />
  );
}
