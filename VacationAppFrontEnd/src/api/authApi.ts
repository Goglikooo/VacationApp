import api from "./axiosConfig";
import type { AuthResponse } from "../types/auth";

export async function loginRequest(email: string, password: string) {
  const response = await api.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });
  return response.data;
}

export async function refreshRequest() {
  const response = await api.post<AuthResponse>("/api/auth/refresh-token");
  return response.data;
}

// export async function logoutRequest() {
//   const response = await api.post("/api/auth/refresh-token");
//   return response;
// }
