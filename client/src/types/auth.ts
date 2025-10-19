// Sign Up
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  role?: string; // optional, defaults to USER if not provided
};

export interface SignUpResponse  {
  id: string;
  email: string;
  name: string;
  role: string;
  message: string;
};

// Login
export interface LoginRequest {
  email: string;
  password: string;
};

export interface LoginResponse {
  status: string;
  data: {
    token: string;
  };
};
