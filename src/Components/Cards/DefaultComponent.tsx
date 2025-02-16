import { theme } from "@/theme";
import {
  Button,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface DefaultCardProps {
  // Default
  name: string;
  quantity: number;

  // Category
  categoryCard?: boolean;
  imageUrl?: string;
  categoryEditFunction?: () => void;
  categoryDeleteFunction?: () => void;

  // Item
  code?: string;
  description?: string;
  itemEditFunction?: () => void;
  itemDeleteFunction?: () => void;
}

const DefaultCard = ({
  categoryCard,
  imageUrl,
  name,
  quantity,
  categoryEditFunction,
  categoryDeleteFunction,
  itemEditFunction,
  itemDeleteFunction,
}: DefaultCardProps) => {
  return (
    <Stack
      w="100%"
      miw={250}
      flex={1}
      gap={0}
      bg={theme.colors.white}
      style={{
        borderRadius: "4px",
        border: "2px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <Flex
        justify="flex-end"
        align="center"
        gap={10}
        bg={theme.colors.gray}
        style={{
          borderRadius: "4px 4px 0 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Button
          variant="transparent"
          p={0}
          h={25}
          w={25}
          bg="none"
          c={theme.colors.greenPrimary}
          onClick={categoryCard ? categoryEditFunction : itemEditFunction}
        >
          <BiEdit size={15} />
        </Button>

        <Divider
          orientation="vertical"
          color="rgba(0, 0, 0, 0.2)"
          mt={5}
          mb={5}
        />

        <Button
          variant="transparent"
          p={0}
          h={25}
          w={25}
          bg="none"
          c={theme.colors.red}
          onClick={categoryCard ? categoryDeleteFunction : itemDeleteFunction}
        >
          <MdDelete size={15} />
        </Button>
      </Flex>

      <Flex p={16} justify="space-between" align="center" gap={8}>
        <Stack gap={0}>
          {categoryCard ? (
            <Text
              c={quantity === 0 ? theme.colors.red : theme.colors.darkGray}
              size="sm"
            >
              {quantity === 0 ? `Sem itens` : `Quantidade: ${quantity}`}
            </Text>
          ) : (
            <Text
              c={quantity === 0 ? theme.colors.red : theme.colors.darkGray}
              size="sm"
            >
              {quantity === 0
                ? `Este item está falta no estoque`
                : `Quantidade: ${quantity}`}
            </Text>
          )}

          <Title order={4} c={theme.colors.darkGray}>
            {name}
          </Title>
        </Stack>

        {categoryCard && <Image src={imageUrl} w={40} h={40} />}
      </Flex>
    </Stack>
  );
};

export default DefaultCard;
