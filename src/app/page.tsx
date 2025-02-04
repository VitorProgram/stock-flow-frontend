import { theme } from "@/theme";
import {
  AspectRatio,
  Box,
  Button,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Stack gap={20}>
      <Image src="/main-image.svg" w="100%" maw={550} />

      <Stack align="center" p={16} gap={20}>
        <Title order={2} c={theme.colors.greenDark}>
          StockFlow
        </Title>
        <Text fw={600} size="sm" ta="center" c={theme.colors.darkGray}>
          Um sistema de gerenciamento de estoque ágil e eficiente para empresas.
        </Text>

        <Link href="/login" style={{ width: "100%", maxWidth: "350px" }}>
          <Button fullWidth bg={theme.colors.greenDark}>
            Fazer Login
          </Button>
        </Link>

        <Text c={theme.colors.darkGray} fw={600} size="xs">
          Se não tem uma conta,{" "}
          <Link href="/cadastro" style={{ color: theme.colors.greenDark }}>
            cadastre-se
          </Link>
          .
        </Text>
      </Stack>
    </Stack>
  );
}
