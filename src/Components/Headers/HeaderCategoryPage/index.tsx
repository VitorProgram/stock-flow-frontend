"use client";
import { Button, Text, Title } from "@mantine/core";
import Header from "..";
import { GoArrowLeft } from "react-icons/go";
import { theme } from "@/theme";
import { useGetCategory } from "@/Components/Cards/@fn/category/getCategory";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/UserContext";

interface HeaderCategoryPage {
  categoryId: string;
}

interface CategoryProps {
  id: string;
  name: string;
}

const HeaderCategoryPage = ({ categoryId }: HeaderCategoryPage) => {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const { data, isLoading, error } = useGetCategory({ id: categoryId });

  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const handleReturnToDashboard = async () => {
    setLoadingButton(true);
    await refreshUser();
    router.push("/dashboard");
  };

  const category: CategoryProps | undefined = data.category;

  return (
    <Header categoryPage>
      <Button
        w={40}
        h={40}
        p={0}
        radius="50%"
        bg={theme.colors.greenPrimary}
        onClick={handleReturnToDashboard}
        loading={loadingButton}
        disabled={loadingButton}
      >
        <GoArrowLeft size={20} />
      </Button>

      {isLoading ? (
        <>
          <Text c={theme.colors.greenPrimary} fw={600}>
            Carregando informações...
          </Text>
        </>
      ) : (
        <>
          <Title order={3} fw={600}>
            {category?.name}
          </Title>
        </>
      )}
    </Header>
  );
};

export default HeaderCategoryPage;
