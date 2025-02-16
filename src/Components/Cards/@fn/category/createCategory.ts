import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../../lib/axios";

interface CategoryProps {
  name: string;
  userId: string;
}

export const createCategory = async ({ name, userId }: CategoryProps) => {
  try {
    const response = await axios.post("/categories", {
      name,
      userId,
    });

    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error(`Erro ao criar categoria: ${error}`);
    throw new Error(`Erro: ${error}`);
  }
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "createCategory" });
    },
  });
};
