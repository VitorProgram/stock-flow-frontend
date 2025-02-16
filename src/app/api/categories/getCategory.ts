import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../../lib/axios";

interface CategoryProps {
  id: string;
}

export const getCategory = async ({ id }: CategoryProps) => {
  try {
    const response = await axios.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    const messageError = `Erro ao coletar informações da categoria. Erro: ${error}`;
    console.error(messageError);
    throw new Error(messageError);
  }
};

export const useGetCategory = ({ id }: CategoryProps) => {
  return useQuery({
    queryKey: ["getCategory", id],
    queryFn: () => getCategory({ id }),
    enabled: !!id,
  });
};
