import { theme } from "@/theme";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <Stack align="center" justify="center" h="100vh" p={16} gap={40}>
      <Stack align="center">
        <Title order={2} c={theme.colors.greenDark}>
          Cadastro
        </Title>
        <Text c={theme.colors.darkGray}>Crie sua conta em poucos cliques</Text>
      </Stack>

      {/* Inputs */}
      <Stack w="100%">
        <TextInput label="E-mail" w="100%" maw={350} required />
        <TextInput label="Senha" w="100%" maw={350} required />
        <TextInput label="Confirme a senha" w="100%" maw={350} required />

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
        <Button bg={theme.colors.greenDark} fullWidth maw={350}>
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
