
export interface LoginFormData {
  email: string;
  password: string;
}

export interface ResetFormData {
  email: string;
}

export interface AuthError {
  message: string;
  type: 'validation' | 'auth' | 'network';
}

export interface BackgroundSliderProps {
  images: readonly string[];
}
