"use client";
import { useLogin } from "@/app/api/user/login";
import { theme } from "@/theme";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Fazer login
  const { mutate, isPending, isError, error } = useLogin();

  const router = useRouter();

  const handleLogin = () => {
    mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      }
    );

    setEmail("");
    setPassword("");
  };

  return (
    <Stack w="100%" align="center" justify="center" h="100vh" p={16} gap={50}>
      <Stack align="center">
        <Title order={2} c={theme.colors.greenDark}>
          Login
        </Title>
        <Text c={theme.colors.darkGray}>Faça login para continuar</Text>
      </Stack>

      {/* Inputs */}
      <Stack w="100%" align="center">
        <TextInput
          type="email"
          label="E-mail"
          w="100%"
          maw={350}
          required
          value={email}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setEmail(ev.target.value)
          }
        />
        <TextInput
          type="password"
          label="Senha"
          w="100%"
          maw={350}
          required
          value={password}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setPassword(ev.target.value)
          }
        />

        <Text c={theme.colors.darkGray} fw={500} size="xs">
          Se não tem uma conta,{" "}
          <Link
            href="/register"
            style={{ color: theme.colors.greenDark, textDecoration: "none" }}
          >
            cadastre-se
          </Link>
          .
        </Text>
      </Stack>

      {/* Buttons */}
      <Stack w="100%" align="center">
        <Button
          bg={theme.colors.greenDark}
          fullWidth
          maw={350}
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
