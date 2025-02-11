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

interface CardProps {
  name: string;
  imageUrl?: string;
  quantity?: number;
}

const Card = ({ name, imageUrl, quantity }: CardProps) => {
  return (
    <Stack
      w="100%"
      maw={500}
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
          c={theme.colors.greenPrimary}
        >
          <BiEdit size={15} />
        </Button>

        <Divider
          orientation="vertical"
          color="rgba(0, 0, 0, 0.2)"
          mt={5}
          mb={5}
        />

        <Button variant="transparent" p={0} h={25} w={25} c={theme.colors.red}>
          <MdDelete size={15} />
        </Button>
      </Flex>

      <Flex p={16} justify="space-between" align="center" gap={8}>
        <Stack gap={0}>
          {quantity === 0 || quantity === undefined ? (
            <Text c={theme.colors.red} size="sm">
              Sem quantidade
            </Text>
          ) : (
            <Text c={theme.colors.darkGray} size="sm">
              Quantidade: {quantity}
            </Text>
          )}

          <Title order={4} c={theme.colors.darkGray}>
            {name}
          </Title>
        </Stack>

        {(imageUrl === "" || imageUrl === undefined) && (
          <Image src={imageUrl} w={40} h={40} />
        )}
      </Flex>
    </Stack>
  );
};

export default Card;
