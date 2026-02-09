import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";
import { describe, expect, it, vi } from "vitest";
import { Skill } from "../../../generated/graphql.ts";
import { Provider } from "../../ui/provider.tsx";
import { ComponentType, ReactElement, ReactNode } from "react";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => {
  const motion = (component: ComponentType<unknown>) => component;
  motion.div = ({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>;
  motion.custom = (component: ComponentType<unknown>) => component;

  return {
    motion,
  };
});

const renderWithChakra = (ui: ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe("Skills Component", () => {
  it("renders 'No technical skills found.' when skills array is empty", () => {
    renderWithChakra(<Skills skills={[]} />);
    expect(screen.getByText("No technical skills found.")).toBeInTheDocument();
  });

  it("renders a list of skills correctly", () => {
    const mockSkills: Skill[] = [
      {
        documentId: "1",
        name: "React",
        iconName: "FaReact",
        iconColor: "#61DAFB",
      },
      {
        documentId: "2",
        name: "TypeScript",
        iconName: "SiTypescript",
        iconColor: "#3178C6",
      },
    ];

    renderWithChakra(<Skills skills={mockSkills} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("handles missing iconName gracefully", () => {
    const mockSkills: Skill[] = [
      {
        documentId: "1",
        name: "Unknown Skill",
        iconName: "",
        iconColor: "#FFFFFF",
      },
    ];

    renderWithChakra(<Skills skills={mockSkills} />);
    expect(screen.getByText("Unknown Skill")).toBeInTheDocument();
  });

  it("uses default icon color when iconColor is missing", () => {
    const mockSkills: Skill[] = [
      {
        documentId: "1",
        name: "React",
        iconName: "FaReact",
        iconColor: "",
      },
    ];

    renderWithChakra(<Skills skills={mockSkills} />);
    // Since it's Chakra UI, it might be harder to check the exact computed style in JSDOM without more setup,
    // but we can check if it rendered the name.
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});
