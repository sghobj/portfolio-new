import { PhotoGallery } from "../../../components/gallery/PhotoGallery.tsx";
import { usePhotos } from "../../../queries/photos.ts";
import { useSpinner } from "../../../hooks/useSpinner.ts";
import { useEffect } from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export const Showcase = () => {
  const { setLoading } = useSpinner();
  const { photos, loading, error } = usePhotos("travel-showcase");

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (error)
    return (
      <Box p={10} textAlign="center">
        <Text color="red.500">Error loading photos: {error.message}</Text>
      </Box>
    );

  if (!photos && !loading) {
    return (
      <Box p={10} textAlign="center">
        <Text>No photos found.</Text>
      </Box>
    );
  }

  if (loading && !photos.length) return null;

  // Map GraphQL photos to react-photo-album format
  const albumPhotos = photos
    .filter((p) => p.width && p.height) // filter out any missing dimensions
    .map((p) => ({
      src: p.src,
      width: p.width!,
      height: p.height!,
      title: p.public_id, // optional
    }));

  return (
    <Box className="showcase-page" bg="var(--color-bg-primary)" minH="100vh">
      <Container
        maxW="container.xl"
        py={{ base: 16, md: 24 }}
        px={{ base: 6, md: 12 }}
      >
        <MotionVStack
          gap={8}
          mb={{ base: 12, md: 16 }}
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            bg="rgba(139, 92, 246, 0.1)"
            color="var(--color-violet)"
            px={4}
            py={1.5}
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            border="1px solid"
            borderColor="rgba(139, 92, 246, 0.2)"
          >
            My Hobbies & Passion
          </Box>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            color="var(--color-text-primary)"
            fontWeight="800"
            letterSpacing="tight"
            lineHeight="1.2"
          >
            Photography Portfolio
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="var(--color-text-secondary)"
            maxW="2xl"
            mx="auto"
            textAlign={{ base: "justify", md: "center" }}
            lineHeight="relaxed"
          >
            A collection of moments captured during my travels and adventures.
            While my professional life revolves around code, photography is a
            creative outlet that allows me to share the beauty of the world from
            my perspective.
          </Text>
        </MotionVStack>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <PhotoGallery photos={albumPhotos} />
        </MotionBox>
      </Container>
    </Box>
  );
};
