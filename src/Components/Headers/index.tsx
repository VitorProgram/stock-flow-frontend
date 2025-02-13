import { theme } from "@/theme";
import { Flex } from "@mantine/core";
import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  categoryPage?: true;
}

const Header = ({ children, categoryPage }: HeaderProps) => {
  return (
    <header>
      <Flex
        h={80}
        bg={theme.colors.greenDark}
        c={theme.colors.white}
        justify={categoryPage ? "flex-start" : "space-between"}
        gap={32}
        align="center"
        pl={15}
        pr={15}
      >
        {children}
      </Flex>
    </header>
  );
};

export default Header;
