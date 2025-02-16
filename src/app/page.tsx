"use client";
import { theme } from "@/theme";
import {
  BackgroundImage,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 400px)");

  return isMobile ? (
    <Stack gap={20}>
      <Image src="/main-image.svg" w="100%" />
      <Stack align="center" p={16} gap={20}>
        <Title order={2} c={theme.colors.greenDark}>
          StockFlow
        </Title>
        <Text fw={600} size="sm" ta="center" c={theme.colors.darkGray}>
          Um sistema de gerenciamento de estoque ágil e eficiente para empresas.
        </Text>
        <Link
          href="/login"
          style={{ width: "100%", maxWidth: "350px", textDecoration: "none" }}
        >
          <Button fullWidth bg={theme.colors.greenPrimary}>
            Fazer Login
          </Button>
        </Link>
        <Text c={theme.colors.darkGray} fw={600} size="xs">
          Se não tem uma conta,{" "}
          <Link href="/register" style={{ color: theme.colors.greenPrimary }}>
            cadastre-se
          </Link>
          .
        </Text>
      </Stack>
    </Stack>
  ) : (
    <BackgroundImage
      src="/main-image-desktop.svg"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Stack align="center" p={32} gap={24} w="400px">
          <Image src="/logo.png" w={70} h={70} />
          <Title order={1} c={theme.colors.white}>
            StockFlow
          </Title>
          <Text fw={600} size="lg" ta="center" c={theme.colors.white}>
            Um sistema de gerenciamento de estoque ágil e eficiente para
            empresas.
          </Text>
          <Link
            href="/login"
            style={{ width: "100%", maxWidth: "350px", textDecoration: "none" }}
          >
            <Button fullWidth bg={theme.colors.greenPrimary}>
              Fazer Login
            </Button>
          </Link>
          <Text c={theme.colors.lightGray} fw={600} size="md">
            Se não tem uma conta,{" "}
            <Link href="/register" style={{ color: theme.colors.white }}>
              cadastre-se
            </Link>
            .
          </Text>
        </Stack>
      </Flex>
    </BackgroundImage>
  );
}
