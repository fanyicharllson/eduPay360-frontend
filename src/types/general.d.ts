interface SchoolRequestDto {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface SchoolResponseDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscriptionStatus: string;
  trialEndDate?: string;
  createdAt?: string;
}
interface ApiResponse<T> {
  success: boolean;
  message: string;
  status: number;
  timestamp?: string;
  elapsedMillis?: number;
  data: T;
}

interface AuthResponse {
  token: string;
  email: string;
  name: string;
  schoolId: number;
  role: string;
  emailVerified: boolean;
  passwordSet: boolean;
}

interface SetPasswordRequest {
  password: string;
  // token: string; // or whatever your backend expects
}

interface SetPasswordApiResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    passwordSet: boolean;
  };
}
interface VerifyOtpRequest {
  email: string;
  code: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string; // JWT token returned on success
}
