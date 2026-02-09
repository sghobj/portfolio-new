import { FaFileLines } from "react-icons/fa6";
import { Box } from "@chakra-ui/react";

export const CvIcon = ({ className }: { className?: string }) => {
  return (
    <Box
      as="span"
      className={className}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <FaFileLines />
    </Box>
  );
};
