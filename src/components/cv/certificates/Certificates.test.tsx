import { render, screen } from "@testing-library/react";
import { Certificates } from "./Certificates";
import { describe, expect, it, vi } from "vitest";
import {
  ComponentCvCertificates,
  UploadFile,
} from "../../../generated/graphql.ts";
import { Provider } from "../../ui/provider.tsx";

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

describe("Certificates Component", () => {
  const mockCertificates: ComponentCvCertificates[] = [
    {
      id: "1",
      name: "AWS Certified Cloud Practitioner",
      instituition: "Amazon Web Services",
      date: "2023-10-01",
      certificateLink: "https://aws.com/cert/1",
      image: {
        url: "/uploads/aws.png",
        alternativeText: "AWS Logo",
        documentId: "img1",
        hash: "hash1",
        mime: "image/png",
        name: "aws.png",
        provider: "local",
        size: 100,
      } as UploadFile,
    },
    {
      id: "2",
      name: "Meta Front-End Developer",
      instituition: "Coursera",
      date: "2023-05-15",
      // No link, no image
    },
  ];

  it("renders a list of certificates correctly", () => {
    renderWithChakra(<Certificates certificates={mockCertificates} />);

    expect(
      screen.getByText("AWS Certified Cloud Practitioner"),
    ).toBeInTheDocument();
    expect(screen.getByText("Amazon Web Services")).toBeInTheDocument();
    expect(screen.getByText("Issued 10.2023")).toBeInTheDocument();

    expect(screen.getByText("Meta Front-End Developer")).toBeInTheDocument();
    expect(screen.getByText("Coursera")).toBeInTheDocument();
    expect(screen.getByText("Issued 05.2023")).toBeInTheDocument();
  });

  it("renders a link when certificateLink is provided", () => {
    renderWithChakra(<Certificates certificates={[mockCertificates[0]]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://aws.com/cert/1");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders the certificate image when provided", () => {
    vi.stubEnv("VITE_STRAPI_BASE_URL", "http://localhost:1337");
    renderWithChakra(<Certificates certificates={[mockCertificates[0]]} />);
    const img = screen.getByAltText("AWS Logo");
    expect(img).toHaveAttribute("src", "http://localhost:1337/uploads/aws.png");
    vi.unstubAllEnvs();
  });

  it("renders fallback icon when no image is provided", () => {
    const { container } = renderWithChakra(
      <Certificates certificates={[mockCertificates[1]]} />,
    );
    // FaCertificate is an SVG
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
