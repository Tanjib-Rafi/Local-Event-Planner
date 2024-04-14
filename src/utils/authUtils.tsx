import { jwtDecode } from 'jwt-decode';

export const accessTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const decodedToken: any = jwtDecode(token);
  return decodedToken.exp < Date.now() / 1000;
};
