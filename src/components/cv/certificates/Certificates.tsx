import { ComponentCvCertificates } from "../../../generated/graphql.ts";
import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { FaCertificate } from "react-icons/fa";
import { formatDate, getStrapiMedia } from "../../../utils/general.ts";

type CertificatesProps = {
  certificates: ComponentCvCertificates[];
};

export const Certificates = ({ certificates }: CertificatesProps) => {
  return (
    <Stack gap={6} w="full" align="stretch" p={0}>
      {certificates.map((cert) => {
        const BadgeContent = (
          <Box
            flexShrink={0}
            overflow="hidden"
            borderRadius="md"
            transition="var(--transition-base)"
          >
            {cert.image?.url ? (
              <Box
                w="100px"
                h="100px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="white"
                p={1}
                borderRadius="md"
              >
                <img
                  src={getStrapiMedia(cert.image.url)}
                  alt={cert.image.alternativeText || cert.name || "Certificate"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : (
              <Box
                w="100px"
                h="100px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="var(--color-bg-tertiary)"
                borderRadius="lg"
                color="var(--color-accent)"
                fontSize="4xl"
              >
                <FaCertificate />
              </Box>
            )}
          </Box>
        );

        return (
          <HStack
            key={cert.id}
            gap={{ base: 4, md: 5 }}
            p={{ base: 4, md: 0 }}
            borderRadius="xl"
            align="center"
          >
            {cert.certificateLink ? (
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer" }}
              >
                {BadgeContent}
              </a>
            ) : (
              BadgeContent
            )}

            <VStack align="flex-start" gap={0.5} flex={1}>
              <Text
                fontWeight="700"
                fontSize={{ base: "sm", md: "md" }}
                color="var(--color-text-primary)"
                lineHeight="shorter"
                mb={1}
              >
                {cert.name}
              </Text>
              {cert.instituition && (
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color="var(--color-text-secondary)"
                  fontWeight="600"
                  lineHeight="shorter"
                  mb={1}
                >
                  {cert.instituition}
                </Text>
              )}
              {cert.date && (
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color="var(--color-text-secondary)"
                  fontWeight="500"
                  lineHeight="shorter"
                  mb={1}
                >
                  Issued {formatDate(cert.date)}
                </Text>
              )}
            </VStack>
          </HStack>
        );
      })}
    </Stack>
  );
};
