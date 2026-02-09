import "./Home.scss";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaRocket } from "react-icons/fa";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";
import { HOME_QUERY } from "../../queries/home-query.ts";
import { HomepageQuery } from "../../generated/graphql.ts";
import { useSpinner } from "../../hooks/useSpinner.ts";
import { useEffect } from "react";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const getIcon = (iconName: string): IconType | null => {
  if (!iconName) return null;
  const icons = { ...FaIcons, ...SiIcons } as Record<string, IconType>;
  return icons[iconName] || null;
};

export const Home = () => {
  const { setLoading } = useSpinner();
  const { loading, data } = useQuery<HomepageQuery>(HOME_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const homepage = data?.homepage;

  if (!homepage && !loading) {
    return (
      <Box p={8} textAlign="center">
        <Text>No homepage data found.</Text>
      </Box>
    );
  }

  if (!homepage) return null;

  return (
    <Box className="home-page" bg="var(--color-bg-primary)">
      {/* Minimal Hero Section */}
      <Box className="hero-section">
        <Box className="hero-bg-overlay" />
        <Container maxW="1200px" position="relative" zIndex={2}>
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
              {homepage?.welcomeText ?? (
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
              {homepage?.heroTitle ?? (
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

              {homepage?.heroSubtitle ?? (
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
              {homepage?.githubLink ?? (
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="btn-outline"
                  borderRadius="full"
                  px={8}
                  width={{ base: "full", sm: "auto" }}
                >
                  <a
                    href={
                      homepage?.githubLink || "https://github.com/sarahghobj"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub style={{ marginRight: "8px" }} /> GitHub
                  </a>
                </Button>
              )}
            </HStack>
          </MotionVStack>
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
                  className="skill-card"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{
                    y: -5,
                    backgroundColor: "var(--color-bg-tertiary)",
                    borderColor: "var(--color-accent)",
                  }}
                  viewport={{ once: true }}
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  border="1px solid transparent"
                  position="relative"
                  overflow="hidden"
                  p={{ base: 6, md: 8 }}
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    viewport={{ once: true }}
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
              Coming soon. I am currently working on side projects to showcase
              my skills outside of confidential professional work.
            </Text>
          </VStack>

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
                Open for interesting projects and collaborations, or see my{" "}
                <Link
                  to="/travel/showcase"
                  style={{ color: "var(--color-accent)", fontWeight: "600" }}
                >
                  photography
                </Link>
                .
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
