import "./Cv.scss";
import {
  Box,
  Grid,
  Heading,
  Separator,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Experience } from "../../components/cv/experience/Experience.tsx";
import { Education } from "../../components/cv/education/Education.tsx";
import { Skills } from "../../components/cv/skills/Skills.tsx";
import { motion, Variants } from "framer-motion";
import { Certificates } from "../../components/cv/certificates/Certificates.tsx";
import { Link } from "react-router-dom";
import { useSpinner } from "../../hooks/useSpinner.ts";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { CV_QUERY } from "../../queries/cv-query.ts";
import {
  ComponentCvCertificates,
  ComponentCvEducation,
  ComponentCvExperience,
  Cv_QueryQuery,
  Skill,
} from "../../generated/graphql.ts";

const MotionBox = motion(Box);

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Cv = () => {
  const { setLoading } = useSpinner();
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [experienceAnimated, setExperienceAnimated] = useState(false);
  const [educationAnimated, setEducationAnimated] = useState(false);
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [certificationsAnimated, setCertificationsAnimated] = useState(false);
  const { loading, data, error } = useQuery<Cv_QueryQuery>(CV_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (error) {
    console.error(error);
  }

  const cv = data?.cv;

  if (!cv && !loading) {
    return (
      <Box p={8} textAlign="center">
        <Text>No CV data found.</Text>
      </Box>
    );
  }

  if (!cv) return null;

  const experiences =
    cv.experiences?.filter((i): i is ComponentCvExperience => !!i) || [];
  const education =
    cv.education?.filter((i): i is ComponentCvEducation => !!i) || [];
  const skills = cv.skills?.filter((i): i is Skill => !!i) || [];
  const certifications =
    cv.certifications?.filter((i): i is ComponentCvCertificates => !!i) || [];
  return (
    <Box className="cv-page-container" bg="var(--color-bg-secondary)">
      <MotionBox
        className="cv-hero-section"
        initial={heroAnimated ? "visible" : "hidden"}
        whileInView="visible"
        onViewportEnter={() => setHeroAnimated(true)}
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        bg="var(--color-bg-tertiary)"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-10%"
          right="-5%"
          w="30%"
          h="120%"
          bg="var(--color-accent)"
          borderRadius="full"
          filter="blur(120px)"
          opacity={0.07}
          zIndex={0}
          pointerEvents="none"
        />
        <Box
          maxW="1200px"
          mx="auto"
          p={{ base: 8, md: 12 }}
          pt={{ base: 16, md: 24 }}
          pb={{ base: 12, md: 20 }}
        >
          <VStack align={{ base: "center", md: "flex-start" }} gap={8}>
            <VStack
              align={{ base: "center", md: "flex-start" }}
              gap={3}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text
                color="var(--color-accent)"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="widest"
                fontSize="xs"
              >
                Available for New Opportunities
              </Text>
              <Heading
                as="h1"
                size={{ base: "4xl", md: "6xl" }}
                color="var(--color-text-primary)"
                lineHeight="1.1"
              >
                Sarah Ghobj
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "2xl" }}
                fontWeight="semibold"
                color="var(--color-text-secondary)"
              >
                Full Stack Developer • IT Professional (4+ Years Exp.)
              </Text>
            </VStack>

            <Text
              fontSize="lg"
              color="var(--color-text-secondary)"
              lineHeight="relaxed"
              maxW="800px"
              textAlign={{ base: "justify", md: "left" }}
            >
              {cv?.about}
            </Text>

            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 4 }}
              gap={{ base: 6, md: 8 }}
              w="full"
              pt={6}
            >
              <Box>
                <Text
                  fontWeight="bold"
                  color="var(--color-text-primary)"
                  fontSize="xs"
                  textTransform="uppercase"
                  mb={1}
                >
                  Location
                </Text>
                <Text color="var(--color-text-secondary)" fontSize="sm">
                  Esslingen, Germany
                </Text>
              </Box>
              <Box>
                <Text
                  fontWeight="bold"
                  color="var(--color-text-primary)"
                  fontSize="xs"
                  textTransform="uppercase"
                  mb={1}
                >
                  LinkedIn
                </Text>
                <Link
                  color="var(--color-text-secondary)"
                  to={"linkedin.com/in/sarahghobj"}
                >
                  linkedin.com/in/sarahghobj
                </Link>
              </Box>
            </SimpleGrid>
          </VStack>
        </Box>
      </MotionBox>

      <Box
        maxW="1200px"
        mx="auto"
        px={{ base: 6, md: 12 }}
        pb={{ base: 12, md: 20 }}
        position="relative"
        zIndex={1}
      >
        <Separator mb={{ base: 8, md: 12 }} display="none" />

        <Grid
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          gap={{ base: 12, lg: 16 }}
          alignItems="start"
        >
          <VStack gap={{ base: 12, md: 16 }} align="stretch">
            <MotionBox
              initial={experienceAnimated ? "visible" : "hidden"}
              whileInView="visible"
              onViewportEnter={() => setExperienceAnimated(true)}
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 6 }}
            >
              <Heading
                as="h2"
                size="xl"
                mb={{ base: 8, md: 8 }}
                color="var(--color-text-primary)"
                textAlign={{ base: "center", md: "left" }}
              >
                Experience
              </Heading>
              {experiences.length > 0 && (
                <Experience experiences={experiences} />
              )}
            </MotionBox>

            <MotionBox
              initial={educationAnimated ? "visible" : "hidden"}
              whileInView="visible"
              onViewportEnter={() => setEducationAnimated(true)}
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 6 }}
            >
              <Heading
                as="h2"
                size="xl"
                mb={{ base: 8, md: 8 }}
                color="var(--color-text-primary)"
                textAlign={{ base: "center", md: "left" }}
              >
                Education
              </Heading>
              {education.length > 0 && <Education education={education} />}
            </MotionBox>
          </VStack>

          <VStack gap={{ base: 12, md: 16 }} align="stretch">
            <MotionBox
              initial={skillsAnimated ? "visible" : "hidden"}
              whileInView="visible"
              onViewportEnter={() => setSkillsAnimated(true)}
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 6 }}
            >
              <Heading
                as="h2"
                size="xl"
                mb={{ base: 8, md: 8 }}
                color="var(--color-text-primary)"
                textAlign={{ base: "center", md: "left" }}
              >
                Technical Skills
              </Heading>
              {skills.length > 0 && <Skills skills={skills} />}
            </MotionBox>

            <MotionBox
              initial={certificationsAnimated ? "visible" : "hidden"}
              whileInView="visible"
              onViewportEnter={() => setCertificationsAnimated(true)}
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 6 }}
            >
              <Heading
                as="h2"
                size="xl"
                mb={{ base: 8, md: 8 }}
                color="var(--color-text-primary)"
                textAlign={{ base: "center", md: "left" }}
              >
                Certifications
              </Heading>
              <Certificates certificates={certifications} />
            </MotionBox>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
};
