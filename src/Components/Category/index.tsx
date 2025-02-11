"use client";
import { theme } from "@/theme";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Category, Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { FiGitPullRequest, FiSearch } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";

interface CategoryProps {
  category: Category;
}

const CategoryComponent = ({ category }: CategoryProps) => {
  const [opened, { open, close }] = useDisclosure(false); // Modal

  const [itemName, setItemName] = useState<string>("");
  const [itemCode, setItemCode] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemError, setItemError] = useState<boolean>(false);

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAddItem = async () => {
    if (itemName === "") {
      setItemError(true);
      return console.error("Os campos são obrigatórios");
    }

    setButtonLoading(true);

    const categoryId = category.id;

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          name: itemName,
          code: itemCode,
          description: itemDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar categoria.");
      }

      close();
      setItemName("");
      setItemCode("");
      setItemDescription("");
      setItemError(false);
      setButtonLoading(false);
    } catch (error) {
      console.error(`Erro ao adicionar novo item. Erro: ${error}`);
    }
  };

  return (
    <>
      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Adicione um novo item"
        centered
      >
        <Stack>
          <Flex gap={8}>
            <TextInput
              placeholder="Nome"
              flex={1}
              value={itemName}
              onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                setItemName(ev.target.value)
              }
            />
            <TextInput
              placeholder="Código (opcional)"
              flex={1}
              value={itemCode}
              onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                setItemCode(ev.target.value)
              }
            />
          </Flex>

          <Textarea
            placeholder="Descrição (opcional)"
            value={itemDescription}
            onChange={(ev: ChangeEvent<HTMLTextAreaElement>) =>
              setItemDescription(ev.target.value)
            }
          />

          <Button
            fullWidth
            bg={theme.colors.greenPrimary}
            onClick={handleAddItem}
            loading={buttonLoading}
            disabled={buttonLoading}
          >
            Adicionar
          </Button>
        </Stack>
      </Modal>

      <header>
        <Flex
          pl={16}
          gap={32}
          w="100%"
          h={80}
          align="center"
          bg={theme.colors.greenDark}
        >
          <ActionIcon
            radius="50%"
            size={40}
            bg={theme.colors.greenPrimary}
            onClick={() => router.push("/dashboard")}
          >
            <GoArrowLeft size={25} />
          </ActionIcon>

          <Title order={2} c={theme.colors.lightGray} fw={600}>
            {category.name}
          </Title>
        </Flex>
      </header>

      {/* SearchInput and New Item */}
      <Flex pl={16} pr={16} gap={16}>
        <TextInput
          type="search"
          flex={1}
          leftSection={<FiSearch size={20} />}
          rightSection={
            <Flex gap={5} align="center">
              <Divider h={20} orientation="vertical" />
              <FiGitPullRequest />
            </Flex>
          }
          placeholder="Pesquisar"
        />

        <Divider orientation="vertical" color={theme.colors.darkGray} />

        <Button
          leftSection={<BiPlus size={20} />}
          bg={theme.colors.greenPrimary}
          onClick={open}
        >
          Novo
        </Button>
      </Flex>

      <Center h={400} w="100%">
        <Text size="sm" fw={700} c={theme.colors.greenDark}>
          Adicione algum item
        </Text>
      </Center>

      {/* <Stack pl={16} pr={16} align="center" w="100%">
        {item.map((item) => (
          <Box key={item.id} w="100%" maw={500}>
            <Flex
              w="100%"
              h={80}
              gap={8}
              p={8}
              align="center"
              justify="space-between"
              bg={theme.colors.white}
              style={{
                borderRadius: "4px",
              }}
            >
              <Stack gap={5}>
                <Title order={5} c={theme.colors.darkGray}>
                  {item.name}
                </Title>
              </Stack>

              <Stack gap={0} align="center">
                <Flex gap={5}>
                  <ActionIcon
                    p={0}
                    variant="transparent"
                    c={theme.colors.greenPrimary}
                  >
                    <BiEdit />
                  </ActionIcon>
                </Flex>
              </Stack>
            </Flex>
          </Box>
        ))}
      </Stack> */}
    </>
  );
};

export default CategoryComponent;
