"use client";
import { useCreateUser } from "@/app/api/user/register";
import { theme } from "@/theme";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Adicionar usuário
  const { mutate, isPending, isError, error } = useCreateUser();

  const handleRegisterUser = () => {
    if (password != confirmPassword) {
      return console.error(`
        As senhas não conferem.
        Senha inicial: ${password}  
        Senha de confirmamção: ${confirmPassword}  
      `);
    }

    mutate(
      { name, email, password },
      {
        onSuccess: () => alert(`${name} foi adicionado como novo usuário!`),
      }
    );

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
          type="text"
          label="Nome"
          w="100%"
          maw={350}
          required
          value={name}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setName(ev.target.value)
          }
        />
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
          Se já tem uma conta,{" "}
          <Link
            href="/login"
            style={{ color: theme.colors.greenDark, textDecoration: "none" }}
          >
            faça login
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
      </Stack>
    </Stack>
  );
};

export default Register;
