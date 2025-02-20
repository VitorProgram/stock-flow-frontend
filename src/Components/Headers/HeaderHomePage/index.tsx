"use client";
import { useAuth } from "@/context/UserContext";
import { theme } from "@/theme";
import {
  ActionIcon,
  Avatar,
  Button,
  Drawer,
  Flex,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IoMenu } from "react-icons/io5";
import Header from "..";
import { useDisclosure } from "@mantine/hooks";
import { MdEdit } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { ChangeEvent, useState } from "react";
import { useUpdateName } from "../@fn/user/updateName";
import { useLogout } from "../@fn/user/logoutUser";

const HeaderHomePage = () => {
  const { user, refreshUser } = useAuth();
  const [opened, { open, close }] = useDisclosure();
  const [openedConfirm, { open: openConfirm, close: closeConfirm }] =
    useDisclosure();

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user?.name || "");

  const { mutate, isPending, isError } = useUpdateName();
  const { mutate: logout, isPending: isLoggingOut } = useLogout(); // ✅ Hook de logout

  const updateName = () => {
    if (!name) return console.error("O campo deve estar preenchido");

    mutate(
      { id: user?.id as string, name },
      {
        onSuccess: () => {
          refreshUser();
          console.log(`O seu nome foi alterado para ${name}`);
          setIsEditingName(false);
        },
        onError: (error) => {
          console.error(`Erro ao alterar nome: ${error}`);
        },
      }
    );
  };

  return (
    <>
      <Header>
        <Flex align="center" gap={8}>
          <Avatar size={40} alt="Imagem do usuario" />

          <Stack gap={0}>
            <Text size="xs" c={theme.colors.gray}>
              Bem vindo(a)
            </Text>
            <Title order={4}>{user?.name}</Title>
          </Stack>
        </Flex>

        <Button
          p={0}
          variant="transparent"
          c={theme.colors.gray}
          onClick={open}
        >
          <IoMenu size={30} />
        </Button>
      </Header>

      <Drawer
        opened={opened}
        onClose={() => {
          setIsEditingName(false);
          close();
        }}
        title="Perfil"
        position="right"
        bg={theme.colors.lightGray}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Stack align="center" gap={32}>
          <Flex style={{ position: "relative" }} w="fit-content">
            <Avatar
              size={60}
              name={user?.name}
              color="cyan"
              bd={`2px solid ${theme.colors.gray}`}
            />

            <ActionIcon
              bg={theme.colors.extraGray}
              c={theme.colors.greenPrimary}
              size={25}
              radius="50%"
              pos="absolute"
              bottom={-5}
              right={-5}
            >
              <TbPhotoEdit />
            </ActionIcon>
          </Flex>

          <Stack align="center" gap={16}>
            <Flex gap={16} align="center">
              {isEditingName ? (
                <TextInput
                  w={150}
                  value={name}
                  onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                    setName(ev.target.value)
                  }
                  placeholder="Novo nome"
                  variant="transparent"
                  tt="uppercase"
                  style={{
                    borderBottom: `1px solid ${theme.colors.darkGray}`,
                  }}
                />
              ) : (
                <Title order={2} c={theme.colors.greenPrimary}>
                  {user?.name}
                </Title>
              )}

              <ActionIcon
                bg={isError ? theme.colors.red : theme.colors.extraGray}
                c={theme.colors.greenPrimary}
                size={25}
                radius="50%"
                onClick={() => setIsEditingName((prev) => !prev)}
              >
                <MdEdit />
              </ActionIcon>
            </Flex>
            <Text c={isEditingName ? theme.colors.gray : theme.colors.darkGray}>
              {user?.email}
            </Text>
          </Stack>

          <Flex gap={8}>
            {isEditingName && (
              <Button
                bg={theme.colors.greenPrimary}
                onClick={updateName}
                loading={isPending}
              >
                Alterar Dados
              </Button>
            )}

            <Button
              variant="transparent"
              color={theme.colors.red}
              onClick={openConfirm}
            >
              Fazer Logout
            </Button>
          </Flex>

          {/* Modal de confirmação do logout */}
          <Modal
            opened={openedConfirm}
            onClose={closeConfirm}
            withCloseButton={false}
            centered
          >
            <Stack align="center" gap={16}>
              <Text c={theme.colors.darkGray} fw={700}>
                Tem certeza que deseja{" "}
                <span style={{ color: theme.colors.red }}>fazer logout?</span>
              </Text>
              <Button
                bg={theme.colors.red}
                onClick={() => logout()} // ✅ Chama a função de logout
                loading={isLoggingOut} // ✅ Exibe loading enquanto está deslogando
              >
                Fazer Logout
              </Button>
            </Stack>
          </Modal>
        </Stack>
      </Drawer>
    </>
  );
};

export default HeaderHomePage;
