export type SignInPayload = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

// PLACEHOLDER — confirm real shape against the backend.
export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type SignInResponseData = AuthTokens & {
  user: AuthUser;
};
