"use client";
import { useDeleteCategory } from "@/app/api/categories/deleteCategory";
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
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface CardProps {
  name: string;
  categoryId?: string;
  imageUrl?: string;
  quantity?: number;
}

const Card = ({ name, categoryId, imageUrl, quantity }: CardProps) => {
  const { refreshUser } = useAuth();
  const { mutate, isPending, isError, error } = useDeleteCategory();

  const router = useRouter();

  const handleEditCategory = () => {
    router.push(`/dashboard/category/${categoryId}`);
  };

  const handleDeleteCategory = () => {
    mutate(
      { id: categoryId as string },
      {
        onSuccess: () => {
          console.log(`Categoria ${name} deletada.`);
          refreshUser();
        },
        onError: () => {
          console.log({ error });
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
          c={isError ? theme.colors.greenDark : theme.colors.red}
          disabled={isPending}
          onClick={handleDeleteCategory}
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
