import Card from "@/Components/Card";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import { theme } from "@/theme";
import { Center, Stack, Text, Title } from "@mantine/core";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Category",
  description: "",
};

interface ItemProps {
  id: number;
  name: string;
  quantity?: number;
}

const Category = () => {
  const data: ItemProps[] = [
    {
      id: Math.floor(Math.random() * 10000),
      name: "Computador",
    },
    {
      id: Math.floor(Math.random() * 10000),
      name: "Computador",
      quantity: 21,
    },
  ];

  return (
    <>
      <Header />
      <Stack pr={16} pl={16} pb={16}>
        <Modal />

        {data.length === 0 ? (
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

        {data.map((item: ItemProps) => (
          <Card key={item.id} name={item.name} quantity={item.quantity} />
        ))}
      </Stack>
    </>
  );
};

export default Category;
