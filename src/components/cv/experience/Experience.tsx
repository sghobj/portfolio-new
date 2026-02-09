import "./Experience.scss";
import { ComponentCvExperience } from "../../../generated/graphql.ts";
import { Box, Stack, Text, Timeline } from "@chakra-ui/react";
import { formatDate } from "../../../utils/general.ts";

type ExperienceProps = {
  experiences: ComponentCvExperience[];
};

export const Experience = ({ experiences }: ExperienceProps) => {
  return (
    <Stack gap={{ base: "4", md: "8" }}>
      <Timeline.Root size={"md"} variant="subtle">
        {experiences?.map((item, index) => (
          <Timeline.Item
            key={index}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="flex-start"
            mb={{ base: 6, md: 0 }}
          >
            <Timeline.Content
              width={{ base: "auto", md: "10rem" }}
              flexShrink={0}
              mb={{ base: 0, md: 0 }}
            >
              <Timeline.Title className="cv-timeline-date">
                {formatDate(item.from)} -{" "}
                {item.to ? formatDate(item.to) : "Present"}
              </Timeline.Title>
            </Timeline.Content>
            <Timeline.Connector display={{ base: "none", md: "flex" }} mx={2}>
              <Timeline.Separator borderColor="var(--color-border)" />
              <Timeline.Indicator
                bg="var(--color-accent)"
                border="4px solid var(--color-bg-primary)"
              ></Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content
              pt={{ base: 0, md: 1 }}
              pl={{ base: 3, md: 0 }}
              borderLeft={{ base: "2px solid var(--color-border)", md: "none" }}
            >
              <Box textAlign="left">
                <Timeline.Title>
                  <Text className={"cv-company"}>{item.company}</Text>
                </Timeline.Title>
                <Timeline.Description>
                  <Text className={"cv-position"}>{item.position}</Text>
                  <Text
                    className={"cv-description"}
                    textAlign={{ base: "justify", md: "left" }}
                  >
                    {item.description ? item.description : ""}
                  </Text>
                </Timeline.Description>
              </Box>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    </Stack>
  );
};
