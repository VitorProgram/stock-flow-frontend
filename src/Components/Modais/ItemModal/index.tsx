"use client";
import { categories } from "@/utils/categoriesData";
import { theme } from "@/theme";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Modal as ModalMantine,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormEvent, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useCreateCategory } from "@/app/api/categories/createCategory";
import { useAuth } from "@/context/UserContext";
import { useCreateItem } from "@/app/api/items/createItem";
import { useForm } from "react-hook-form";
import { getCategory, useGetCategory } from "@/app/api/categories/getCategory";
import { useQueryClient } from "@tanstack/react-query";

interface ItemModalProps {
  categoryId: string;
}

interface FormData {
  name: string;
  code?: string;
  quantity: number;
  description?: string;
}

const ItemModal = ({ categoryId }: ItemModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending, isError, error } = useCreateItem();

  const { user, refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const queryClient = useQueryClient();

  const handleAddItem = (data: FormData) => {
    mutate(
      {
        name: data.name,
        quantity: Number(data.quantity),
        categoryId: categoryId,
      },
      {
        onSuccess: () => {
          console.log(`${data.name} foi adicionado ao itens!`);

          //  Diz ao React Query que os dados da categoria podem estar desatualizados e precisam ser recarregados
          queryClient.invalidateQueries({
            queryKey: ["getCategory", categoryId],
          });

          close();
        },
        onError: () => {
          console.log({ error });
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
        title="Adicione um item"
        centered
      >
        <form onSubmit={handleSubmit(handleAddItem)}>
          <Stack gap={16}>
            <Flex wrap="wrap" gap={16}>
              <TextInput
                placeholder="Nome"
                flex={1}
                miw={150}
                {...register("name")}
              />
              <TextInput
                placeholder="Código (opcional)"
                flex={1}
                miw={150}
                {...register("code")}
              />
            </Flex>

            <Stack gap={16} flex={1}>
              <TextInput
                placeholder="Quantidade"
                miw={150}
                flex={1}
                type="number"
                {...register("quantity")}
              />
              <TextInput
                placeholder="Descrição (opcional)"
                miw={150}
                flex={1}
                {...register("description")}
              />
            </Stack>

            <Button fullWidth bg={theme.colors.greenPrimary} type="submit">
              Adicionar
            </Button>
          </Stack>
        </form>
      </ModalMantine>
    </>
  );
};

export default ItemModal;
