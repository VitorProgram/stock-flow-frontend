import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axios } from "../../../../../lib/axios";

interface DeleteItemProps {
  id: string;
}

export const deleteItem = async ({ id }: DeleteItemProps) => {
  try {
    const response = await axios.delete(`/items/deleteItem/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar item: ${error}`);
    throw new Error(`Erro ao deletar categoria: ${error}`);
  }
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategory"] });
    },
  });
};
