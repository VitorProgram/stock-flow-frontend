import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { axios } from "../../../../lib/axios";

interface UserProps {
  email: string;
  password: string;
}

const login = async ({ email, password }: UserProps) => {
  try {
    const response = await axios.post("/auth/login", { email, password });

    const { token, user } = response.data;

    setCookie("token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });
    setCookie("user", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao fazer login");
  }
};

// Hook do React Query para login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loginUser"] });
    },
  });
};
