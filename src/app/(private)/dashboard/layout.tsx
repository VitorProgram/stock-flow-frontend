import { auth } from "@/auth";
import { theme } from "@/theme";
import { Avatar, Button, Flex, Stack, Text, Title } from "@mantine/core";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { IoMenu } from "react-icons/io5";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <Stack bg={theme.colors.lightGray} h="100vh">
      {children}
    </Stack>
  );
};

export default DashboardLayout;
