"use client";
import { theme } from "@/theme";
import { Center, Flex, Stack, Text, Title } from "@mantine/core";
import CategoryModal from "../Modais/CategoryModal";
import Card from "../Card";
import { useAuth } from "@/context/UserContext";

const Dashboard = () => {
  const { user } = useAuth();
  const categories = user?.categories || [];

  return (
    <Stack
      pl={16}
      pr={16}
      pb={16}
      style={{ overflowY: "scroll", scrollbarWidth: "none" }}
    >
      <CategoryModal />

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

      <Flex wrap="wrap" gap={24}>
        {categories?.map((category) => (
          <Card
            key={category.id}
            name={category.name}
            categoryId={category.id}
            quantity={category.items.length}
            imageUrl={`/icons/${category.name.toLocaleLowerCase()}.svg`}
          />
        ))}
      </Flex>
    </Stack>
  );
};

export default Dashboard;
