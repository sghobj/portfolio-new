import { ReactNode } from "react";

export type Contact = {
  socialMedia: {
    href: string;
    name: string;
    icon: ReactNode;
  }[];
  email: string;
};
