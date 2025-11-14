
export interface FormData {
  name: string;
  email: string;
  message: string;
}

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}
