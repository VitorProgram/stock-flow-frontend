"use client";
import { theme } from "@/theme";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginWithGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const router = useRouter();

  const handleLoginWithCredentials = async () => {
    try {
      // Fazendo a requisição POST
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Transofomrando a resposa tem string
      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText); // mudando a resposta para JSON
      } catch {
        throw new Error("Resposta inválida do servidor");
      }

      // Se ocorrer algum erro
      if (!response.ok) {
        return alert(responseData.error || "Erro no cadastro");
      }

      // Se tudo certo, acesso liberado a dashboard
      router.push("/dashboard");
    } catch {}
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
            href="/cadastro"
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
          onClick={handleLoginWithCredentials}
        >
          Entrar
        </Button>

        <Text c={theme.colors.greenDark} fw={600}>
          ou
        </Text>

        <Button
          w={50}
          h={50}
          p={0}
          radius="50%"
          bg={theme.colors.gray}
          onClick={handleLoginWithGoogle}
        >
          <FcGoogle size={30} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
