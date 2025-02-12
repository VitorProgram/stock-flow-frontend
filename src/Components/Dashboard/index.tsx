"use client";
import { theme } from "@/theme";
import { Center, Stack, Text, Title } from "@mantine/core";
import Modal from "../Modal";
import Card from "../Card";
import { useAuth } from "@/context/UserContext";

const Dashboard = () => {
  const { user } = useAuth();
  const categories = user?.categories || [];

  console.log({ categories });

  return (
    <Stack
      pl={16}
      pr={16}
      pb={16}
      style={{ overflowY: "scroll", scrollbarWidth: "none" }}
    >
      <Modal />

      {categories?.length === 0 || categories === undefined ? (
        <Center h={400} w="100%">
          <Text size="sm" fw={700} c={theme.colors.greenDark}>
            Adicione alguma categoria
          </Text>
        </Center>
      ) : (
        <Title order={5} fw={400} c={theme.colors.darkGray}>
          Visão Geral
        </Title>
      )}

      <Stack gap={24}>
        {categories?.map((category) => (
          <Card
            key={category.id}
            name={category.name}
            quantity={category.items.length}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Dashboard;
