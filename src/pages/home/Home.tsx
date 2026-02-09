import "./Home.scss";
import { motion, Variants } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaExternalLinkAlt, FaRocket } from "react-icons/fa";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";
import { HOME_QUERY } from "../../queries/home-query.ts";
import { HomepageQuery } from "../../generated/graphql.ts";
import { useSpinner } from "../../hooks/useSpinner.ts";
import { useEffect, useState } from "react";
import { getStrapiMedia } from "../../utils/general.ts";
import { useQuery } from "@apollo/client";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const getIcon = (iconName: string): IconType | null => {
  if (!iconName) return null;
  const icons = { ...FaIcons, ...SiIcons } as Record<string, IconType>;
  return icons[iconName] || null;
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Home = () => {
  const { setLoading } = useSpinner();
  const [expertisesAnimated, setExpertisesAnimated] = useState(false);
  const [toolsAnimated, setToolsAnimated] = useState(false);
  const [projectsAnimated, setProjectsAnimated] = useState(false);
  const { loading, data } = useQuery<HomepageQuery>(HOME_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const homepage = data?.homepage;

  if (!homepage && !loading) {
    return (
      <Box p={8} textAlign="center">
        <Text>No homepage data found.</Text>
      </Box>
    );
  }

  // Use a local variable to store data to avoid unmounting during refetch
  if (!homepage) return null;

  return (
    <Box className="home-page" bg="var(--color-bg-primary)">
      {/* Minimal Hero Section */}
      <Box className="hero-section">
        <Box className="hero-bg-overlay" />
        <Container maxW="1200px" position="relative" zIndex={2}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            gap={{ base: 12, md: 8 }}
            alignItems="center"
          >
            <MotionVStack
              align={{ base: "center", md: "flex-start" }}
              gap={8}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <VStack
                align={{ base: "center", md: "flex-start" }}
                gap={4}
                textAlign={{ base: "center", md: "left" }}
              >
                {homepage?.welcomeText && (
                  <Text
                    color="var(--color-accent)"
                    fontWeight="bold"
                    fontSize="sm"
                    textTransform="uppercase"
                    letterSpacing="widest"
                  >
                    {homepage?.welcomeText}
                  </Text>
                )}
                {homepage?.heroTitle && (
                  <Heading
                    as="h1"
                    size="4xl"
                    className="hero-title"
                    color="var(--color-text-primary)"
                    maxW="800px"
                  >
                    {homepage?.heroTitle}
                  </Heading>
                )}

                {homepage?.heroSubtitle && (
                  <Text
                    fontSize="xl"
                    color="var(--color-text-secondary)"
                    maxW="600px"
                    className="hero-subtitle"
                  >
                    {homepage?.heroSubtitle}
                  </Text>
                )}
              </VStack>

              <HStack
                gap={4}
                pt={4}
                direction={{ base: "column", sm: "row" }}
                width={{ base: "full", sm: "auto" }}
                justify="center"
              >
                <Button
                  asChild
                  size="xl"
                  className="btn-primary"
                  borderRadius="full"
                  px={8}
                  width={{ base: "full", sm: "auto" }}
                >
                  <Link to="/cv">
                    View My CV <FaArrowRight style={{ marginLeft: "8px" }} />
                  </Link>
                </Button>
              </HStack>
            </MotionVStack>

            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              display="flex"
              justifyContent="center"
              position="relative"
            >
              <Box className="hero-image-wrapper">
                <Box className="hero-image-backdrop" />
                <Image
                  src={getStrapiMedia(homepage.heroImage?.url)}
                  alt={homepage.heroImage?.alternativeText || "Sarah Ghobj"}
                  className="hero-image"
                />
              </Box>
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Core Expertise Section */}
      <Box py={{ base: 16, md: 24 }} bg="var(--color-bg-secondary)">
        <Container maxW="1200px">
          <VStack
            align={{ base: "center", md: "flex-start" }}
            mb={{ base: 10, md: 16 }}
          >
            <Heading
              as="h2"
              size="2xl"
              className="section-title"
              textAlign={{ base: "center", md: "left" }}
            >
              Core Expertise
            </Heading>
            <Text
              color="var(--color-text-secondary)"
              fontSize="lg"
              maxW="600px"
              textAlign={{ base: "center", md: "left" }}
            >
              Building modern web applications with a focus on performance,
              scalability, and exceptional user experiences.
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: 6, md: 8 }}
            mb={{ base: 12, md: 20 }}
            alignItems="stretch"
          >
            {homepage?.expertises?.map((exp) => {
              if (!exp) return null;
              const DynamicIcon = exp.iconName ? getIcon(exp.iconName) : null;
              return (
                <MotionBox
                  key={exp.id}
                  className="skill-card expertise-card"
                  variants={fadeIn}
                  initial={expertisesAnimated ? "visible" : "hidden"}
                  whileInView="visible"
                  onViewportEnter={() => setExpertisesAnimated(true)}
                  whileHover={{
                    y: -8,
                    backgroundColor: "var(--color-bg-tertiary)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  p={{ base: 6, md: 6 }}
                  alignItems={{ base: "center", md: "flex-start" }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Box
                    position="absolute"
                    top="-20px"
                    right="-20px"
                    w="100px"
                    h="100px"
                    bg={exp.iconColor || "var(--color-accent)"}
                    opacity={0.05}
                    borderRadius="full"
                    filter="blur(30px)"
                  />
                  <Box
                    className="icon-container"
                    color={exp.iconColor || "var(--color-accent)"}
                    fontSize="xl"
                  >
                    {DynamicIcon && <DynamicIcon />}
                  </Box>
                  <Heading
                    as="h3"
                    size="md"
                    color="var(--color-text-primary)"
                    className="card-title"
                  >
                    {exp.title}
                  </Heading>
                  <Text fontSize="sm" className="card-description">
                    {exp.description}
                  </Text>
                </MotionBox>
              );
            })}
          </SimpleGrid>

          <VStack align="center" gap={10}>
            <Text
              color="var(--color-text-muted)"
              fontWeight="bold"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Tools & Technologies I work with
            </Text>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap={10} w="full">
              {homepage?.skills?.map((tool, idx: number) => {
                if (!tool) return null;
                const DynamicIcon = tool.iconName
                  ? getIcon(tool.iconName)
                  : null;
                return (
                  <MotionVStack
                    key={tool.documentId || idx}
                    gap={3}
                    initial={
                      toolsAnimated
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    whileInView={{ opacity: 1, scale: 1 }}
                    onViewportEnter={() => setToolsAnimated(true)}
                    whileHover={{ y: -5 }}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Box
                      fontSize="4xl"
                      color={tool.iconColor || "var(--color-accent)"}
                    >
                      {DynamicIcon && <DynamicIcon />}
                    </Box>
                    <Text
                      color="var(--color-text-secondary)"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      {tool.name}
                    </Text>
                  </MotionVStack>
                );
              })}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Projects Section - Placeholder */}
      <Box py={{ base: 16, md: 24 }}>
        <Container maxW="1200px">
          <VStack
            align={{ base: "center", md: "flex-start" }}
            mb={{ base: 8, md: 12 }}
          >
            <Heading
              as="h2"
              size="2xl"
              className="section-title"
              textAlign={{ base: "center", md: "left" }}
            >
              Featured Projects
            </Heading>
            <Text
              color="var(--color-text-secondary)"
              fontSize="lg"
              textAlign={{ base: "center", md: "left" }}
            >
              A selection of my recent work and side projects.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {homepage?.featuredProjects.map((project, index) => {
              if (!project) return null;
              return (
                <MotionBox
                  key={project.documentId || index}
                  className="project-card"
                  variants={fadeIn}
                  initial={projectsAnimated ? "visible" : "hidden"}
                  whileInView="visible"
                  onViewportEnter={() => setProjectsAnimated(true)}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box className="project-image">
                    <a
                      href={project.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={getStrapiMedia(project.image?.url)}
                        alt={project.image?.alternativeText || project.title}
                      />
                      <Box className="project-overlay" />
                    </a>
                  </Box>
                  <Box className="project-content">
                    <HStack justify="space-between" mb={3}>
                      <HStack gap={2}>
                        {project.tags?.map((tag, tagIdx) => {
                          if (!tag) return null;
                          return (
                            <Text
                              key={tagIdx}
                              fontSize="xs"
                              fontWeight="bold"
                              color="var(--color-bg-primary)"
                              bg="var(--color-accent)"
                              px={2}
                              py={1}
                              borderRadius="full"
                              textTransform="uppercase"
                            >
                              {tag.name}
                            </Text>
                          );
                        })}
                      </HStack>
                      <ChakraLink
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt color="var(--color-accent)" />
                      </ChakraLink>
                    </HStack>
                    <Heading
                      as="h3"
                      size="md"
                      mb={2}
                      color="var(--color-text-primary)"
                      className="project-title-link"
                    >
                      <ChakraLink
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.title}
                      </ChakraLink>
                    </Heading>
                    <Text fontSize="sm" color="var(--color-text-secondary)">
                      {project.description}
                    </Text>
                  </Box>
                </MotionBox>
              );
            })}
          </SimpleGrid>

          {/* Optional: keep the placeholder text below if needed, or remove it */}
          {homepage?.featuredProjects.length === 0 && (
            <Box className="project-placeholder">
              <VStack gap={4} textAlign="center">
                <Box color="var(--color-violet)" fontSize="4xl">
                  <FaRocket />
                </Box>
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  color="var(--color-text-primary)"
                >
                  Project Showcase in Progress
                </Text>
                <Text maxW="500px" color="var(--color-text-secondary)">
                  Check back soon to see smaller projects and experiments I've
                  been working on in my free time.
                </Text>
              </VStack>
            </Box>
          )}
        </Container>
      </Box>

      {/* Simple Footer/CTA */}
      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="1200px">
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={{ base: 10, md: 8 }}
            textAlign={{ base: "center", md: "left" }}
          >
            <VStack align={{ base: "center", md: "flex-start" }} gap={2}>
              <Heading size="lg" color="var(--color-text-primary)">
                Let's connect
              </Heading>
              <Text color="var(--color-text-secondary)">
                Open for interesting projects and collaborations. Feel free to
                reach out!
              </Text>
            </VStack>
            <Button
              asChild
              className="btn-outline"
              borderRadius="full"
              px={8}
              size="lg"
              width={{ base: "full", sm: "auto" }}
            >
              <a href="mailto:sarahghobj@hotmail.com">Get in Touch</a>
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
