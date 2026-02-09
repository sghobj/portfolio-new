import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "../../components/ui/provider.tsx";
import { MockedProvider } from "@apollo/client/testing";
import { HOME_QUERY } from "../../queries/home-query.ts";
import { GeneralProvider } from "../../context/GeneralContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ComponentType, ReactElement, ReactNode } from "react";

// Mock framer-motion
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
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
  };
});

const mockHomeData = {
  homepage: {
    __typename: "Homepage",
    welcomeText: "Welcome to my portfolio",
    heroTitle: "Building robust solutions with a minimalist touch.",
    heroSubtitle: "I'm Sarah Ghobj, a Full Stack Developer",
    githubLink: "https://github.com/sarahghobj",
    expertises: [
      {
        __typename: "ComponentHomepageExpertiseCard",
        id: "1",
        title: "Frontend Development",
        description: "Modern UI/UX with React",
        iconName: "FaReact",
        iconColor: "#61DAFB",
      },
      {
        __typename: "ComponentHomepageExpertiseCard",
        id: "2",
        title: "Backend Systems",
        description: "Scalable Node.js APIs",
        iconName: "SiNodedotjs",
        iconColor: "#339933",
      },
      {
        __typename: "ComponentHomepageExpertiseCard",
        id: "3",
        title: "Full Stack Solutions",
        description: "End-to-end development",
        iconName: "FaRocket",
        iconColor: "#F59E0B",
      },
    ],
    skills: [
      {
        __typename: "Skill",
        documentId: "skill-1",
        name: "JavaScript",
        iconName: "SiJavascript",
        iconColor: "#F7DF1E",
      },
    ],
  },
};

const mocks = [
  {
    request: {
      query: HOME_QUERY,
    },
    result: {
      data: mockHomeData,
    },
  },
];

const renderWithProviders = (ui: ReactElement) => {
  return render(
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <GeneralProvider>
          <Provider>{ui}</Provider>
        </GeneralProvider>
      </BrowserRouter>
    </MockedProvider>,
  );
};

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (!window.matchMedia) {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    }
  });

  it("renders the hero section", async () => {
    renderWithProviders(<Home />);

    // Wait for the query to resolve
    expect(
      await screen.findByText((content) =>
        content.includes("Building robust solutions with a minimalist touch."),
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/I'm Sarah Ghobj, a Full Stack Developer/i),
    ).toBeInTheDocument();
  });

  it("renders the Core Expertise section", async () => {
    renderWithProviders(<Home />);

    expect(await screen.findByText("Core Expertise")).toBeInTheDocument();
    expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    expect(screen.getByText("Backend Systems")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Solutions")).toBeInTheDocument();
  });

  it("renders the Technical Tools section", async () => {
    renderWithProviders(<Home />);

    expect(
      await screen.findByText("Tools & Technologies I work with"),
    ).toBeInTheDocument();
    // JavaScript should be there from SKILLS_LOGOS
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("renders the Projects section placeholder", async () => {
    renderWithProviders(<Home />);

    expect(await screen.findByText("Featured Projects")).toBeInTheDocument();
    expect(
      screen.getByText("Project Showcase in Progress"),
    ).toBeInTheDocument();
  });
});
