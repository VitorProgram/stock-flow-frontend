import { AuthProvider } from "@/context/UserContext";
import { theme } from "@/theme";
import { Stack } from "@mantine/core";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <AuthProvider>
      <Stack bg={theme.colors.lightGray} h="100vh">
        {children}
      </Stack>
    </AuthProvider>
  );
};

export default DashboardLayout;
