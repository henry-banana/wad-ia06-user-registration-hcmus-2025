export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    email: string;
    createdAt: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}