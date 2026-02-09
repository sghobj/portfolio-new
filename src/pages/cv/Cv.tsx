import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import "./Cv.scss";
import { CV_QUERY } from "../../queries/cv-query.ts";
import {
  ComponentCvCertificates,
  ComponentCvEducation,
  ComponentCvExperience,
  ComponentCvLanguage,
  ComponentCvPublication,
  ComponentCvSkill,
} from "../../generated/graphql.ts";
import { useSpinner } from "../../hooks/useSpinner.ts";
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
import { motion } from "framer-motion";
import { Certificates } from "../../components/cv/certificates/Certificates.tsx";

const MotionBox = motion(Box);

type CV_Type = {
  skills?: ComponentCvSkill[];
  experiences?: ComponentCvExperience[];
  education?: ComponentCvEducation[];
  languages?: ComponentCvLanguage[];
  publications?: ComponentCvPublication[];
  certifications?: ComponentCvCertificates[];
  about?: string;
};

export const Cv = () => {
  const [cv, setCv] = useState<CV_Type>();
  const { setLoading } = useSpinner();
  const { loading, data, error } = useQuery(CV_QUERY);

  useEffect(() => {
    if (data && loading) {
      setLoading(false);
    }
  }, [data, loading, setLoading]);

  useEffect(() => {
    if (data?.cv) {
      setCv(data.cv);
      setLoading(false);
    } else if (error) {
      console.log(error);
    }
  }, [data, error, setLoading]);

  if (!data) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Box className="cv-page-container" bg="var(--color-bg-secondary)">
      <MotionBox
        className="cv-hero-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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
                  Email
                </Text>
                <Text color="var(--color-text-secondary)" fontSize="sm">
                  sarahghobj@hotmail.com
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
                <Text color="var(--color-text-secondary)" fontSize="sm">
                  linkedin.com/in/sarahghobj
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
                  GitHub
                </Text>
                <Text color="var(--color-text-secondary)" fontSize="sm">
                  github.com/sarahghobj
                </Text>
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 8 }}
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
              {cv?.experiences && <Experience experiences={cv.experiences} />}
            </MotionBox>

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 8 }}
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
              {cv?.education && <Education education={cv.education} />}
            </MotionBox>
          </VStack>

          <VStack gap={{ base: 12, md: 16 }} align="stretch">
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 8 }}
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
              {cv?.skills && <Skills skills={cv.skills} />}
            </MotionBox>

            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="skill-card"
              p={{ base: 6, md: 8 }}
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
              <Certificates certificates={cv?.certifications || []} />
            </MotionBox>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
};
