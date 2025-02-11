import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserProps {
  email: string;
  password: string;
}

const login = async ({ email, password }: UserProps) => {
  const response = await fetch("http://localhost:3333/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || "Erro ao fazer login com o usuário";

    throw new Error(errorMessage);
  }

  return response.json();
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loginUsers"] });
    },
  });
};
