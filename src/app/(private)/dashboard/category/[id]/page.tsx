"use client";

import { useParams } from "next/navigation";
import { useGetCategory } from "@/Components/Cards/@fn/category/getCategory";
import { Box, Center, Flex, Stack, Text, Title } from "@mantine/core";
import HeaderCategoryPage from "@/Components/Headers/HeaderCategoryPage";
import { useAuth } from "@/context/UserContext";
import ItemModal from "@/Components/Modais/ItemModal";
import CardItem from "@/Components/Cards/CardItem";
import { theme } from "@/theme";

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

      {category?.items.length === 0 ? (
        <Center h={400}>
          <Text size="sm" fw={700} c={theme.colors.greenDark}>
            Adicione items a categoria
          </Text>
        </Center>
      ) : (
        <>
          {/* Lista de Itens */}
          <Flex pl={16} pr={16} wrap="wrap" gap={24}>
            {category?.items.map((item) => (
              <CardItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                id={item.id}
                categoryId={id}
              />
            ))}
          </Flex>
        </>
      )}
    </Stack>
  );
};

export default CategoryPage;
