import "./About.scss";
import { Box, Text } from "@chakra-ui/react";

type AboutType = {
  text: string;
};
export const About = ({ text }: AboutType) => {
  return (
    <Box>
      <Text className={"about-me-text"}>{text}</Text>
    </Box>
  );
};
