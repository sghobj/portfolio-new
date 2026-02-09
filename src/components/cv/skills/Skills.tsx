import { ComponentCvSkill } from "../../../generated/graphql.ts";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { IconType } from "react-icons";

const MotionVStack = motion(VStack);

type SkillsProps = {
  skills: ComponentCvSkill[];
};

const getIcon = (iconName: string): IconType | null => {
  if (!iconName) return null;
  const icons = { ...FaIcons, ...SiIcons } as Record<string, IconType>;
  return icons[iconName] || null;
};

export const Skills = ({ skills }: SkillsProps) => {
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
              key={skill.id || index}
              gap={2}
              align="center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
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
