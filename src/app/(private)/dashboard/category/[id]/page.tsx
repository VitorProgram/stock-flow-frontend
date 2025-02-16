"use client";

import { useParams } from "next/navigation";
import { useGetCategory } from "@/app/api/categories/getCategory";
import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import HeaderCategoryPage from "@/Components/Headers/HeaderCategoryPage";
import { useAuth } from "@/context/UserContext";
import Card from "@/Components/Card";
import ItemModal from "@/Components/Modais/ItemModal";

// Interface para os itens dentro da categoria
interface ItemProps {
  id: string;
  name: string;
  quantity: number;
}

// Interface para a categoria
interface CategoryProps {
  id: string;
  name: string;
  items: ItemProps[];
}

const CategoryPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { user } = useAuth();
  const { data, isLoading, error } = useGetCategory({ id });

  if (isLoading) return console.log("Carregando...");
  if (error)
    return console.log("Erro ao coletar informações da categoria", error);

  // Tipando corretamente os dados recebidos
  const category: CategoryProps | undefined = data?.category;

  return (
    <Stack pb={16}>
      {/* Header */}
      <HeaderCategoryPage categoryId={id} />

      <Box pl={16} pr={16}>
        <ItemModal categoryId={id} />
      </Box>

      {/* Lista de Itens */}
      <Flex pl={16} pr={16} wrap="wrap" gap={24}>
        {category?.items.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            isItem
            itemId={item.id}
          />
        ))}
      </Flex>
    </Stack>
  );
};

export default CategoryPage;
