import { FaHome, FaUser } from "react-icons/fa"; // src/routes.ts

export const links = [
  {
    label: "Home",
    icon: <FaHome className="nav-icon" />,
    href: "/",
    testId: "link-home",
  },
  {
    label: "CV",
    icon: <FaUser className="nav-icon" />,
    href: "/cv",
    testId: "link-cv",
  },
  {
    label: "Showcase",
    icon: <FaUser className="nav-icon" />,
    href: "/travel/showcase",
    testId: "link-showcase",
  },
];
