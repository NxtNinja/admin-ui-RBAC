import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login, logout } from "../helper/authHelper";
import { Loginschemtype } from "@/utils/zodSchema";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { HTTPError } from "ky";

export const useLogin = (): UseMutationResult<
  unknown,
  Error,
  Loginschemtype
> => {
  const router = useRouter();
  return useMutation({
    mutationFn: (credentials: Loginschemtype) => login(credentials),
    onSuccess: async () => {
      toast.success("Welcome back...");
      router.push("/");
    },
    onError: async (error) => {
      if (error.name === "HTTPError") {
        const httpError = error as HTTPError;
        const errorJson = await httpError.response.json<any>();
        toast.error(errorJson.errors[0].message as string);
      } else {
        toast.error("Network Error");
      }
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      router.push("/auth/login");
    },
    onError: async (error) => {
      if (error.name === "HTTPError") {
        const httpError = error as HTTPError;
        const errorJson = await httpError.response.json<any>();
        toast.error(errorJson.errors[0].message as string);
      } else {
        toast.error("Network Error");
      }
    },
  });
};
