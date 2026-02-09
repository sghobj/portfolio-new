import { PhotoGallery } from "../../../components/gallery/PhotoGallery.tsx";
import { usePhotos } from "../../../queries/photos.ts";
import { useSpinner } from "../../../hooks/useSpinner.ts";
import { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

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
          initial="hidden"
          animate="visible"
          variants={fadeIn}
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

          <Link
            href="https://instagram.com/sarah_ghobj"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <HStack
              gap={3}
              bg="rgba(139, 92, 246, 0.1)"
              px={6}
              py={3}
              position="relative"
              overflow="hidden"
            >
              <Box
                p={2}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                boxShadow="0 0 15px rgba(139, 92, 246, 0.4)"
              >
                <FaInstagram size="1.2em" />
              </Box>
              <Text
                fontWeight="500"
                fontSize="md"
                letterSpacing="tight"
                color="var(--color-violet)"
                m={"auto"}
              >
                sarah_ghobj
              </Text>
            </HStack>
          </Link>
        </MotionVStack>

        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <PhotoGallery photos={albumPhotos} />
        </MotionBox>
      </Container>
    </Box>
  );
};
