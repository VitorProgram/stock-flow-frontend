"use client";
import { useCreateUser } from "@/app/api/user/register";
import { theme } from "@/theme";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const { mutate, isPending, isError, error } = useCreateUser();
  const [formError, setFormError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    if (data.password != data.confirmPassword)
      return alert("As senhas não conferem");

    mutate(
      { name: data.firstName, email: data.email, password: data.password },
      {
        onSuccess: () => {
          alert(`${data.firstName} foi adicionado como novo usuário!`);
          router.push("/login");
        },
        onError: () => {
          router.push("/login");
          setFormError("Erro ao cadastrar, tente novamente");
          console.log({ error });
          return;
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack align="center" justify="center" h="100vh" p={16} gap={40}>
        <Stack align="center">
          <Title order={2} c={theme.colors.greenDark}>
            Cadastro
          </Title>
          <Text c={theme.colors.darkGray}>
            Crie sua conta em poucos cliques
          </Text>
        </Stack>

        {error && (
          <Text c={theme.colors.red} size="xs">
            Erro ao cadastrar, tente novamnte
          </Text>
        )}

        {/* Inputs */}
        <Stack w="100%" align="center">
          <TextInput
            type="text"
            label="Primeiro Nome"
            w="100%"
            maw={350}
            required
            {...register("firstName")}
          />
          <TextInput
            type="email"
            label="E-mail"
            w="100%"
            maw={350}
            required
            {...register("email")} // name
          />
          <TextInput
            type="password"
            label="Senha"
            w="100%"
            maw={350}
            required
            {...register("password")} // name
          />
          <TextInput
            type="password"
            label="Confirme a senha"
            w="100%"
            maw={350}
            required
            {...register("confirmPassword")} // name
          />

          <Text c={theme.colors.darkGray} fw={500} size="xs">
            Se já tem uma conta,{" "}
            <Link
              href="/login"
              style={{
                color: theme.colors.greenPrimary,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              faça login
            </Link>
            .
          </Text>
        </Stack>

        {/* Buttons */}
        <Stack w="100%" align="center">
          <Button
            bg={isError ? theme.colors.red : theme.colors.greenPrimary}
            fullWidth
            maw={350}
            type="submit"
            loading={isPending}
          >
            Cadastrar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default RegisterForm;
