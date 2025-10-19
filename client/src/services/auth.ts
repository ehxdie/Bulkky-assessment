import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
} from "../types/auth";
import api from "./api";

export function login(credentials: LoginRequest) {
  return api.post<LoginResponse>("/auth/login", credentials);
}

export function register(data: SignUpRequest) {
  return api.post<SignUpResponse>("/auth/sign-up", data);
}
