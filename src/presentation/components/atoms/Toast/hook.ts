import { toast as sonnerToast, type ExternalToast } from "sonner";

export type Variant =
  | "default"
  | "success"
  | "warning"
  | "destructive"
  | "info";
export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface ToastOptions extends Partial<ExternalToast> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: Variant;
  duration?: number;
  position?: Position;
}

export function toast({
  title,
  description,
  variant = "default",
  duration = 6000,
  position,
  ...rest
}: ToastOptions) {
  const opts: ExternalToast = { description, duration, position, ...rest };

  switch (variant) {
    case "success":
      sonnerToast.success(title, opts);
      break;
    case "destructive":
      sonnerToast.error(title, opts);
      break;
    case "warning":
      sonnerToast.warning(title, opts);
      break;
    case "info":
      sonnerToast.info(title, opts);
      break;
    default:
      sonnerToast.info(title, opts);
      break;
  }
}

export type Toast = typeof toast;

export function useToast() {
  return { toast, dismiss: sonnerToast.dismiss };
}
