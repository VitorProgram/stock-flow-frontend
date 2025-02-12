import { axios } from "../../../../lib/axios"; // Instância configurada
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

const createUser = async ({ name, email, password }: UserProps) => {
  try {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data; // Retorna os dados da resposta
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Erro ao criar usuário";
    throw new Error(errorMessage);
  }
};

// Hook do React Query para criar usuário
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registerUser"] });
    },
  });
};
