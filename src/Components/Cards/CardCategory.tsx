"use client";
import { useDeleteCategory } from "@/Components/Cards/@fn/category/deleteCategory";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import DefaultCard from "./DefaultComponent";

interface CardCategoryProps {
  id: string;
  name: string;
  quantity: number;
}

const CardCategory = ({ id, name, quantity }: CardCategoryProps) => {
  const imageUrl = name.toLocaleLowerCase();

  const { mutate, isPending, isError, error } = useDeleteCategory();
  const { refreshUser } = useAuth();
  const router = useRouter();

  const deleteCategory = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          console.log(`Categoria deletada.`);
          refreshUser();
        },
        onError: () => {
          console.log(`Erro ao deletar categoria. Erro: ${error}`);
          return;
        },
      }
    );
  };

  const editCategory = () => {
    router.push(`/dashboard/category/${id}`);
  };

  return (
    <DefaultCard
      categoryCard
      name={name}
      quantity={quantity}
      imageUrl={`/icons/${imageUrl}.svg`}
      categoryDeleteFunction={deleteCategory}
      categoryEditFunction={editCategory}
    />
  );
};

export default CardCategory;
