import { Loginschemtype } from "@/utils/zodSchema";
import { poster } from "./apiHelper";

export const login = (credentials: Loginschemtype) => {
  return poster("auth/login", credentials);
};
export const logout = () => {
  return poster("auth/logout");
};
