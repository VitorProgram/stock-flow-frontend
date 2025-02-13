"use client";
import { useLogin } from "@/app/api/user/login";
import { theme } from "@/theme";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { mutate, isPending, isError, error } = useLogin();
  const [formError, setFormError] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          console.log(`${data.email} fez login! Carregando dashboard...`);
          router.push("/dashboard");
        },
        onError: () => {
          setFormError("Erro ao fazer login, tente novamente");
          console.log({ error });
          return;
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack w="100%" align="center" justify="center" h="100vh" p={16} gap={50}>
        <Stack align="center">
          <Title order={2} c={theme.colors.greenDark}>
            Login
          </Title>
          <Text c={theme.colors.darkGray}>Faça login para continuar</Text>

          {error && (
            <Text c={theme.colors.red} size="xs">
              {formError}
            </Text>
          )}
        </Stack>

        {/* Inputs */}
        <Stack w="100%" align="center">
          <TextInput
            type="email"
            label="E-mail"
            w="100%"
            maw={350}
            required
            {...register("email")}
          />
          <TextInput
            type="password"
            label="Senha"
            w="100%"
            maw={350}
            required
            {...register("password")}
          />

          <Text c={theme.colors.darkGray} fw={500} size="xs">
            Se não tem uma conta,{" "}
            <Link
              href="/register"
              style={{
                color: theme.colors.greenPrimary,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              cadastre-se
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
            Entrar
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Login;
