import { getCategory } from "@/Components/Cards/@fn/category/getCategory";
import { useDeleteItem } from "@/Components/Cards/@fn/item/deleteItem";
import DefaultCard from "./DefaultComponent";

interface CardItemProps {
  id: string;
  categoryId: string;
  name: string;
  quantity: number;
}

const CardItem = ({ id, categoryId, name, quantity }: CardItemProps) => {
  const { mutate, isPending, isError, error } = useDeleteItem();

  const deleteItem = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          console.log(`Item deletado.`);

          // Busca novamente os dados da categoria
          getCategory({ id: categoryId });
        },
        onError: () => {
          console.log(`Erro ao deletar item. Error: ${error}`);
          return;
        },
      }
    );
  };

  const editItem = () => {
    console.log("Editando item...");
  };

  return (
    <>
      <DefaultCard
        name={name}
        quantity={quantity}
        itemDeleteFunction={deleteItem}
        itemEditFunction={editItem}
      />
    </>
  );
};

export default CardItem;
