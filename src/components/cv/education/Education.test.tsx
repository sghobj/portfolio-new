import { render, screen } from "@testing-library/react";
import { Education } from "./Education";
import { describe, expect, it } from "vitest";
import { ComponentCvEducation } from "../../../generated/graphql.ts";
import { Provider } from "../../ui/provider.tsx";

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe("Education Component", () => {
  const mockEducation: ComponentCvEducation[] = [
    {
      id: "1",
      institute: "University of Science",
      specialty: "Computer Science",
      from: "2018-09-01",
      to: "2022-06-01",
      description: "Bachelor of Science",
      location: "Germany",
    },
    {
      id: "2",
      institute: "Tech Bootcamp",
      specialty: "Full Stack Development",
      from: "2022-07-01",
      to: null,
      description: "Intensive training",
      location: "Online",
    },
  ];

  it("renders a list of education entries correctly", () => {
    renderWithChakra(<Education education={mockEducation} />);

    expect(screen.getByText("University of Science")).toBeInTheDocument();
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("Bachelor of Science")).toBeInTheDocument();
    expect(screen.getByText("09.2018 - 06.2022")).toBeInTheDocument();

    expect(screen.getByText("Tech Bootcamp")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Development")).toBeInTheDocument();
    expect(screen.getByText("Intensive training")).toBeInTheDocument();
    expect(screen.getByText("07.2022 - Present")).toBeInTheDocument();
  });
});
