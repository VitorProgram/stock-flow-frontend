import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

const createUser = async ({ name, email, password }: UserProps) => {
  const response = await fetch("http://localhost:3333/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  // Se a requisição falhar, tentar extrair a mensagem de erro do backend
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || "Erro ao criar usuário";

    throw new Error(errorMessage);
  }

  return response.json();
};

// Hook do React Query para criar usuário
export const useCreateUser = () => {
  const queryClient = useQueryClient(); // Cliente do React Query para manipular cache

  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
