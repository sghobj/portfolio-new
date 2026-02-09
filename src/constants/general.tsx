import { FaCamera, FaHome } from "react-icons/fa";
import { CvIcon } from "../components/icons/CvIcon.tsx"; // src/routes.ts

export const links = [
  {
    label: "Home",
    icon: <FaHome className="nav-icon" />,
    href: "/",
    testId: "link-home",
  },
  {
    label: "CV",
    icon: <CvIcon className="nav-icon" />,
    href: "/cv",
    testId: "link-cv",
  },
  {
    label: "Photography",
    icon: <FaCamera className="nav-icon" />,
    href: "/travel/showcase",
    testId: "link-showcase",
  },
];
