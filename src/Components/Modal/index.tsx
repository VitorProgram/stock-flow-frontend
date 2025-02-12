"use client";
import { categories } from "@/utils/categoriesData";
import { theme } from "@/theme";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Modal as ModalMantine,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useCreateCategory } from "@/app/api/categories/createCategory";
import { useAuth } from "@/context/UserContext";

const Modal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryError, setCategoryError] = useState<boolean>(false);

  const { user, refreshUser } = useAuth();
  const { mutate, isPending, isError, error } = useCreateCategory();

  const handleAddCategory = () => {
    if (categoryName === "") return setCategoryError(true);

    mutate(
      { name: categoryName, userId: user?.id as string },
      {
        onSuccess: () => {
          console.log(`Categoria ${categoryName} criada.`);
          refreshUser();
          close();
        },
        onError: () => {
          setCategoryError(true);
          console.log({ error });
          return;
        },
      }
    );
  };

  return (
    <>
      {/* Adicionar categoria ou pesquisar */}
      <Flex gap={8}>
        <TextInput
          leftSection={<FiSearch size={20} />}
          placeholder="Pesquisar"
          type="search"
          flex={1}
        />

        <Divider orientation="vertical" color={theme.colors.darkGray} />

        <Button
          w="100%"
          maw={120}
          rightSection={<BiPlus size={20} />}
          bg={theme.colors.greenDark}
          onClick={open}
        >
          Novo
        </Button>
      </Flex>

      {/* Modal */}
      <ModalMantine
        opened={opened}
        onClose={close}
        title="Adicione uma categoria"
        centered
      >
        {categoryError && (
          <Text c={theme.colors.red} size="sm" mb={8}>
            Erro ao adicionar uma categoria
          </Text>
        )}

        <Select
          placeholder="Escritório, Computadores..."
          data={categories.map((category) => category.name)}
          value={categoryName}
          onChange={(value) => {
            if (value) {
              setCategoryName(value);
              console.log(value);
            }
          }}
        />

        <Button
          mt={16}
          fullWidth
          bg={theme.colors.greenPrimary}
          loading={isPending}
          onClick={handleAddCategory}
        >
          Adicionar
        </Button>
      </ModalMantine>
    </>
  );
};

export default Modal;
