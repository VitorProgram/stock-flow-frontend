"use client";
import { theme } from "@/theme";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  // Requisição de cadastro
  const handleRegisterUser = async () => {
    if (password !== confirmPassword) {
      return alert("As senhas não conferem.");
    }

    try {
      // Requisição post
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define  formato JSON
        body: JSON.stringify({ email, password }), // Transforma os dados em JSON
      });

      // Lê a resposta do servidor como texto para evitar erro caso não seja um JSON válido
      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText); // Tenta converter a resposta para JSON
      } catch {
        throw new Error("Resposta inválida do servidor");
      }

      if (!response.ok) {
        alert(responseData.error || "Erro no cadastro");
        return;
      }

      alert("Usuário cadastrado com sucesso! Carregando página de login...");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <Stack align="center" justify="center" h="100vh" p={16} gap={40}>
      <Stack align="center">
        <Title order={2} c={theme.colors.greenDark}>
          Cadastro
        </Title>
        <Text c={theme.colors.darkGray}>Crie sua conta em poucos cliques</Text>
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
        <TextInput
          type="password"
          label="Confirme a senha"
          w="100%"
          maw={350}
          required
          value={confirmPassword}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(ev.target.value)
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
          onClick={handleRegisterUser}
        >
          Cadastrar
        </Button>

        <Text c={theme.colors.greenDark} fw={600}>
          ou
        </Text>

        <Button w={50} h={50} p={0} radius="50%" bg={theme.colors.gray}>
          <FcGoogle size={30} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Register;
