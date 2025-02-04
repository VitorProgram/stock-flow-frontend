import { theme } from "@/theme";
import { Avatar, Button, Flex, Stack, Text, Title } from "@mantine/core";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { IoMenu } from "react-icons/io5";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/");
  }

  return (
    <Stack bg={theme.colors.lightGray} h="100vh">
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
            <Avatar size={40} src={session.user?.image} />

            <Stack gap={0}>
              <Text size="xs" c={theme.colors.gray}>
                Bem vindo(a)
              </Text>
              <Title order={4}>{session.user?.name}</Title>
            </Stack>
          </Flex>

          {/* Menu Hambuguer */}
          <Button p={0} variant="transparent" c={theme.colors.gray}>
            <IoMenu size={30} />
          </Button>
        </Flex>
      </header>

      {children}
    </Stack>
  );
};

export default DashboardLayout;
