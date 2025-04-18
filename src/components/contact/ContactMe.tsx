import { HStack, Icon } from "@chakra-ui/react";
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
};

const sizeMap: Record<NonNullable<ContactMeProps["size"]>, string> = {
  sm: "1em",
  md: "1.5em",
  lg: "2em",
};

export const ContactMe = ({ size = "md" }: ContactMeProps) => {
  const [contacts, setContacts] = useState<Contact>();

  const { data } = useQuery(CONTACTS_QUERY);

  useEffect(() => {
    if (data) {
      const { contactLinks } = data.cv;
      setContacts(contactLinks);
    }
  });
  return (
    <HStack className="contacts-div">
      {contacts?.socialMedia.map((link) => {
        const IconComponent = iconMap[link.name.toLowerCase()];
        return (
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
      })}
      <Icon
        className="contact-icon"
        boxSize={`calc(${sizeMap[size]} + 0.2em)`}
        onClick={() => (window.location.href = `mailto:${contacts?.email}`)}
        cursor="pointer"
      >
        <MdEmail />
      </Icon>
    </HStack>
  );
};
