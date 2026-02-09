import { Skill } from "../../../generated/graphql.ts";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";
import { useState } from "react";

const MotionVStack = motion(VStack);

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

type SkillsProps = {
  skills: Skill[];
};

const getIcon = (iconName: string): IconType | null => {
  if (!iconName) return null;
  const icons = { ...FaIcons, ...SiIcons } as Record<string, IconType>;
  return icons[iconName] || null;
};

export const Skills = ({ skills }: SkillsProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  if (!skills || skills.length === 0) {
    return (
      <Box textAlign="center" color="var(--color-text-secondary)">
        No technical skills found.
      </Box>
    );
  }
  return (
    <Box className="skills-container">
      <SimpleGrid columns={{ base: 3, sm: 4, md: 4 }} gap={{ base: 6, md: 8 }}>
        {skills.map((skill, index) => {
          const DynamicIcon = skill.iconName ? getIcon(skill.iconName) : null;
          const iconColor = skill.iconColor || "var(--color-accent)";
          const label = skill.name || "";

          return (
            <MotionVStack
              key={skill.documentId || index}
              gap={2}
              align="center"
              custom={index}
              variants={itemVariants}
              initial={hasAnimated ? "visible" : "hidden"}
              whileInView="visible"
              onViewportEnter={() => setHasAnimated(true)}
              viewport={{ once: true, amount: 0.1 }}
            >
              <Box fontSize="3xl" color={iconColor}>
                {DynamicIcon && <DynamicIcon />}
              </Box>
              <Text className="skill-name" fontSize="xs" textAlign="center">
                {label}
              </Text>
            </MotionVStack>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
