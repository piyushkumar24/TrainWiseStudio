import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "destructive" | "success";
};

export const useToast = () => {
  const toast = ({ title, description, action, variant = "default" }: ToastProps) => {
    const toastFn = variant === "destructive" 
      ? sonnerToast.error 
      : variant === "success" 
        ? sonnerToast.success 
        : sonnerToast;

    toastFn(title, {
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    });
  };

  // Add empty toasts array to prevent errors with any component expecting it
  const toasts: any[] = [];

  return { toast, toasts };
}; 