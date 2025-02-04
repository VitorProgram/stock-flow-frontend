import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";

// Mantine UI
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "Stock Flow",
  description:
    "Um sistema de gerenciamento de estoque ágil e eficiente para empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
