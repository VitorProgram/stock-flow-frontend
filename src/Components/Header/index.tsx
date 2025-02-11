import { theme } from "@/theme";
import { Avatar, Button, Flex, Stack, Text, Title } from "@mantine/core";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <header>
      <Flex
        h={80}
        bg={theme.colors.greenDark}
        c={theme.colors.white}
        justify="space-between"
        align="center"
        pl={15}
        pr={15}
      >
        {/* Left Section */}
        <Flex align="center" gap={8}>
          <Avatar size={40} alt="Imagem do usuario" />

          <Stack gap={0}>
            <Text size="xs" c={theme.colors.gray}>
              Bem vindo(a)
            </Text>
            <Title order={4}>Vitor</Title>
          </Stack>
        </Flex>

        {/* Menu Hambuguer */}
        <Button p={0} variant="transparent" c={theme.colors.gray}>
          <IoMenu size={30} />
        </Button>
      </Flex>
    </header>
  );
};

export default Header;
