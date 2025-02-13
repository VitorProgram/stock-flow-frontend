"use client";
import { useAuth } from "@/context/UserContext";
import { theme } from "@/theme";
import { Avatar, Button, Flex, Stack, Text, Title } from "@mantine/core";
import { IoMenu } from "react-icons/io5";
import Header from "..";

const HeaderHomePage = () => {
  const { user } = useAuth();

  return (
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

      {/* Menu Hambuguer */}
      <Button p={0} variant="transparent" c={theme.colors.gray}>
        <IoMenu size={30} />
      </Button>
    </Header>
  );
};

export default HeaderHomePage;
