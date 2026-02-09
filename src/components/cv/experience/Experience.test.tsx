import { render, screen } from "@testing-library/react";
import { Experience } from "./Experience";
import { describe, expect, it } from "vitest";
import { ComponentCvExperience } from "../../../generated/graphql.ts";
import { Provider } from "../../ui/provider.tsx";

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe("Experience Component", () => {
  const mockExperiences: ComponentCvExperience[] = [
    {
      id: "1",
      company: "Tech Solutions",
      position: "Senior Developer",
      from: "2020-01-01",
      to: "2023-12-31",
      description: "Leading a team of 5",
      location: "Berlin",
    },
    {
      id: "2",
      company: "Startup Inc",
      position: "Full Stack Developer",
      from: "2018-01-01",
      to: "2019-12-31",
      description: "Building MVP",
      location: "Munich",
    },
  ];

  it("renders a list of experiences correctly", () => {
    renderWithChakra(<Experience experiences={mockExperiences} />);

    expect(screen.getByText("Tech Solutions")).toBeInTheDocument();
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();
    expect(screen.getByText("Leading a team of 5")).toBeInTheDocument();
    expect(screen.getByText("01.2020 - 12.2023")).toBeInTheDocument();

    expect(screen.getByText("Startup Inc")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
    expect(screen.getByText("Building MVP")).toBeInTheDocument();
    expect(screen.getByText("01.2018 - 12.2019")).toBeInTheDocument();
  });
});
