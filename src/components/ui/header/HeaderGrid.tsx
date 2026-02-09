import { Box, SimpleGrid, Text } from "@chakra-ui/react";

type HeaderGridProps = {
  title: string;
};
export const HeaderGrid = ({ title }: HeaderGridProps) => {
  return (
    <SimpleGrid columns={3} gap={2}>
      <Box bg={"#c0e0fb"} h={5} borderRadius={50} />
      <Text fontSize={"lg"} fontWeight={"bold"} m={"auto"} textAlign={"center"}>
        {title}
      </Text>
      <Box bg={"#c0e0fb"} h={5} borderRadius={50} />
    </SimpleGrid>
  );
};
