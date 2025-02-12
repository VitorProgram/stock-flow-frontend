import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../lib/axios";

interface DeleteCategoryProps {
  id: string;
}

export const deleteCategory = async ({ id }: DeleteCategoryProps) => {
  try {
    const response = await axios.delete(`/categories/deleteCategory/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar categoria: ${error}`);
    throw new Error(`Erro: ${error}`);
  }
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
