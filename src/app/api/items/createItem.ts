import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../lib/axios";

interface ItemProps {
  name: string;
  quantity: number;
  categoryId: string;
}

const createItem = async ({ name, quantity, categoryId }: ItemProps) => {
  try {
    const response = await axios.post("/items", {
      name,
      quantity,
      categoryId,
    });

    return response.data;
  } catch (error) {
    const errorMessage = `Erro ao criar item: ${error}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "createItem" });
    },
  });
};
