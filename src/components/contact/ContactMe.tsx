import { HStack, Icon, VStack } from "@chakra-ui/react";
import { Contact } from "../../types/contacts.ts";
import { IconType } from "react-icons";
import { FaInstagram, FaLinkedin, FaXingSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useQuery } from "@apollo/client";
import { CONTACTS_QUERY } from "../../queries/contacts-query.ts";
import { useEffect, useState } from "react";
import "./ContactMe.scss";

const iconMap: Record<string, IconType> = {
  linkedin: FaLinkedin,
  xing: FaXingSquare,
  instagram: FaInstagram,
};

type ContactMeProps = {
  size?: "sm" | "md" | "lg";
  vertical?: boolean;
};

const sizeMap: Record<NonNullable<ContactMeProps["size"]>, string> = {
  sm: "1em",
  md: "1.5em",
  lg: "2em",
};

export const ContactMe = ({
  size = "md",
  vertical = false,
}: ContactMeProps) => {
  const [contacts, setContacts] = useState<Contact>();

  const { data } = useQuery(CONTACTS_QUERY);

  useEffect(() => {
    if (data) {
      const { contactLinks } = data.cv;
      setContacts(contactLinks);
    }
  }, [data]);

  const Container = vertical ? VStack : HStack;

  return (
    <Container className="contacts-div">
      {contacts?.socialMedia
        .filter((link) => link.name.toLowerCase() !== "instagram")
        .map((link) => {
          const nameLower = link.name.toLowerCase();
          const IconComponent = iconMap[nameLower];

          const iconElement = (
            <Icon
              as={IconComponent}
              key={link.href}
              boxSize={sizeMap[size]}
              onClick={() => window.open(link.href, "_blank")}
              cursor="pointer"
              aria-label={link.name}
              className="contact-icon"
            />
          );

          return iconElement;
        })}
      {contacts?.email ? (
        <Icon
          className="contact-icon"
          boxSize={`calc(${sizeMap[size]} + 0.2em)`}
          onClick={() => (window.location.href = `mailto:${contacts?.email}`)}
          cursor="pointer"
          aria-label="Email"
        >
          <MdEmail />
        </Icon>
      ) : null}
    </Container>
  );
};
