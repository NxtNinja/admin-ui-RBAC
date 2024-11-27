import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login, logout, register } from "../helper/authHelper";
import { Loginschemtype, Registerschemtype } from "@/utils/zodSchema";
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
      router.push("/dashboard");
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
export const useRegister = (): UseMutationResult<
  unknown,
  Error,
  Registerschemtype
> => {
  const router = useRouter();
  return useMutation({
    mutationFn: (credentials: Registerschemtype) => register(credentials),
    onSuccess: async () => {
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
