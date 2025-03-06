import { toast } from 'react-toastify';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const showToast = ({ title, description, variant = 'default' }: ToastOptions) => {
    const message = description || title;
    
    if (variant === 'destructive') {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  return {
    toast: showToast
  };
}