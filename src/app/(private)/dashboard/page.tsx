"use client";
import { theme } from "@/theme";
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

interface dataProps {
  id: number;
  name: string;
}

const Dashboard = () => {
  const [data, setData] = useState<dataProps[]>([]);
  const [openedModal, { open, close }] = useDisclosure();

  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const addCategory = () => {
    const newCategory = {
      id: Math.floor(Math.random() * 100000) + Date.now(),
      name: newCategoryName,
    };

    setData([newCategory, ...data]);
    close();
  };

  const removeCategory = (id: number) => {
    const newArray = data.filter((category) => category.id != id);
    setData(newArray);
  };

  return (
    <Stack
      pl={16}
      pr={16}
      style={{ overflowY: "scroll", scrollbarWidth: "none" }}
    >
      <Modal
        opened={openedModal}
        onClose={close}
        title="Adicione uma categoria"
        centered
      >
        <TextInput
          placeholder="Nome"
          value={newCategoryName}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setNewCategoryName(ev.target.value)
          }
        />

        <Button
          mt={16}
          fullWidth
          onClick={addCategory}
          bg={theme.colors.greenPrimary}
        >
          Adicionar
        </Button>
      </Modal>

      <Flex gap={8}>
        <TextInput
          leftSection={<FiSearch size={20} />}
          placeholder="Pesquisar"
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

      {data.length != 0 && <Text>Visão Geral</Text>}

      {data.length === 0 && (
        <Center h={400} w="100%">
          <Text size="sm" fw={700} c={theme.colors.greenDark}>
            Adicione alguma categoria
          </Text>
        </Center>
      )}

      {/* Categorias do Estoque */}
      {data.map((data) => (
        <Flex
          key={data.id}
          w="100%"
          maw={350}
          h={80}
          gap={8}
          p={8}
          align="center"
          justify="space-between"
          bg={theme.colors.white}
          style={{ borderRadius: "4px" }}
        >
          <Stack gap={5}>
            <Text size="sm">Em estoque: 10</Text>
            <Title order={5}>{data.name}</Title>
          </Stack>

          <Stack gap={0} align="center">
            <Avatar size={35} color={theme.colors.greenPrimary} />

            <ActionIcon
              onClick={() => removeCategory(data.id)}
              p={0}
              variant="transparent"
              c={theme.colors.red}
            >
              <MdDelete />
            </ActionIcon>
          </Stack>
        </Flex>
      ))}
    </Stack>
  );
};

export default Dashboard;
