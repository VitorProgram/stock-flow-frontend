import { theme } from "@/theme";
import { Center, Stack, Text, Title } from "@mantine/core";
import Modal from "../Modal";
import Card from "../Card";

const Dashboard = () => {
  const data = [
    {
      id: Math.floor(Math.random() * 1000000),
      name: "Escritório",
      imageUrl: "/icons/escritório.svg",
      quantity: 10,
    },
    {
      id: Math.floor(Math.random() * 1000000),
      name: "Outros",
      imageUrl: "/icons/outros.svg",
      quantity: 45,
    },
  ];

  return (
    <Stack
      pl={16}
      pr={16}
      pb={16}
      style={{ overflowY: "scroll", scrollbarWidth: "none" }}
    >
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

      <Stack gap={24}>
        {data.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            imageUrl={card.imageUrl}
            quantity={card.quantity}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Dashboard;
