"use client";
import { useDeleteCategory } from "@/app/api/categories/deleteCategory";
import { getCategory, useGetCategory } from "@/app/api/categories/getCategory";
import { useDeleteItem } from "@/app/api/items/deleteItem";
import { useAuth } from "@/context/UserContext";
import { theme } from "@/theme";
import {
  Button,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface CardProps {
  name: string;
  isItem?: true;
  categoryId?: string;
  itemId?: string;
  imageUrl?: string;
  quantity?: number;
}

const Card = ({
  name,
  isItem,
  categoryId,
  itemId,
  imageUrl,
  quantity,
}: CardProps) => {
  const { refreshUser } = useAuth();
  const {
    mutate: mutateCategory,
    isPending: isPendingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useDeleteCategory();

  const {
    mutate: mutateItem,
    isPending: isPendingItem,
    isError: isErrorItem,
    error: errorItem,
  } = useDeleteItem();

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleEditCategory = () => {
    router.push(`/dashboard/category/${categoryId}`);
  };

  const handleDeleteCategory = () => {
    mutateCategory(
      { id: categoryId as string },
      {
        onSuccess: () => {
          console.log(`Categoria ${name} deletada.`);
          refreshUser();
        },
        onError: () => {
          console.log({ errorCategory });
          return;
        },
      }
    );
  };

  const handleDeleteItem = () => {
    mutateItem(
      { id: itemId as string },
      {
        onSuccess: () => {
          console.log(`Item deletado.`);

          // Busca novamente os dados da categoria
          getCategory({ id: categoryId as string });
        },
        onError: (error) => {
          console.log(`Erro ao deletar item: ${errorItem || error}`);
          return;
        },
      }
    );
  };

  return (
    <Stack
      w="100%"
      miw={250}
      flex={1}
      gap={0}
      bg={theme.colors.white}
      style={{
        borderRadius: "4px",
        border: "2px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <Flex
        justify="flex-end"
        align="center"
        gap={10}
        bg={theme.colors.gray}
        style={{
          borderRadius: "4px 4px 0 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Button
          variant="transparent"
          p={0}
          h={25}
          w={25}
          bg="none"
          c={theme.colors.greenPrimary}
          onClick={handleEditCategory}
        >
          <BiEdit size={15} />
        </Button>

        <Divider
          orientation="vertical"
          color="rgba(0, 0, 0, 0.2)"
          mt={5}
          mb={5}
        />

        <Button
          variant="transparent"
          p={0}
          h={25}
          w={25}
          bg="none"
          c={theme.colors.red}
          disabled={isItem ? isPendingItem : isPendingCategory}
          loading={isItem ? isPendingItem : isPendingCategory}
          onClick={isItem ? handleDeleteItem : handleDeleteCategory}
        >
          <MdDelete size={15} />
        </Button>
      </Flex>

      <Flex p={16} justify="space-between" align="center" gap={8}>
        <Stack gap={0}>
          {quantity === 0 || quantity === undefined ? (
            <Text c={theme.colors.red} size="sm">
              Sem quantidade
            </Text>
          ) : (
            <Text c={theme.colors.darkGray} size="sm">
              Quantidade: {quantity}
            </Text>
          )}

          <Title order={4} c={theme.colors.darkGray}>
            {name}
          </Title>
        </Stack>

        {(imageUrl !== "" || imageUrl != undefined) && (
          <Image src={imageUrl} w={40} h={40} />
        )}
      </Flex>
    </Stack>
  );
};

export default Card;
