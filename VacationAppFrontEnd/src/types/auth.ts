export interface AuthResponse {
  accessToken: string;
  userEmail: string;
  userName: string;
  userRole: string;
}

export interface AuthUser {
  userEmail: string;
  userName: string;
  userRole: string;
}
