import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../../lib/axios";

interface UserProps {
  id: string;
  name: string;
}

const updateName = async ({ id, name }: UserProps) => {
  try {
    const response = await axios.put("/user/update", {
      id,
      name,
    });

    return response.data;
  } catch (error) {
    const errorMessage = `Erro ao alterar nome de usuário: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const useUpdateName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "userName" });
    },
  });
};
