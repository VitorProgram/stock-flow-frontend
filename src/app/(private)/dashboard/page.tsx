import { theme } from "@/theme";
import {
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IoMenu } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const data = [
  { id: 1, name: "Computadores", qtd: 20 },
  { id: 2, name: "Notebooks", qtd: 14 },
  { id: 3, name: "Cadeiras Gamer", qtd: 6 },
  { id: 4, name: "Cadeiras Gamer", qtd: 6 },
  { id: 5, name: "Cadeiras Gamer", qtd: 6 },
  { id: 6, name: "Cadeiras Gamer", qtd: 6 },
  { id: 7, name: "Cadeiras Gamer", qtd: 6 },
];

const Dashboard = () => {
  return (
    <Stack
      pl={16}
      pr={16}
      style={{ overflowY: "scroll", scrollbarWidth: "none" }}
    >
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
            <Text size="sm">Em estoque: {data.qtd}</Text>
            <Title order={5}>{data.name}</Title>
          </Stack>

          <Stack gap={0} align="center">
            <Avatar size={35} color={theme.colors.greenPrimary} />

            <ActionIcon p={0} variant="transparent" c={theme.colors.red}>
              <MdDelete />
            </ActionIcon>
          </Stack>
        </Flex>
      ))}
    </Stack>
  );
};

export default Dashboard;
