import { render, screen } from "@testing-library/react";
import { Showcase } from "./Showcase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "../../../components/ui/provider.tsx";
import { MockedProvider } from "@apollo/client/testing";
import { PHOTOS_QUERY } from "../../../queries/photos.ts";

// Mock framer-motion
vi.mock("framer-motion", () => {
  const motion = (component: React.ComponentType<unknown>) => component;
  motion.div = ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>;
  motion.custom = (component: React.ComponentType<unknown>) => component;

  return {
    motion,
  };
});

const mockPhotosData = {
  photos: [
    {
      public_id: "photo1",
      src: "http://example.com/photo1.jpg",
      width: 800,
      height: 600,
    },
  ],
};

const mocks = [
  {
    request: {
      query: PHOTOS_QUERY,
      variables: { folder: "travel-showcase" },
    },
    result: {
      data: mockPhotosData,
    },
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MockedProvider mocks={mocks}>
      <Provider>{ui}</Provider>
    </MockedProvider>,
  );
};

describe("Showcase Page", () => {
  beforeEach(() => {
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

  it("renders the photography portfolio page", async () => {
    renderWithProviders(<Showcase />);

    expect(
      await screen.findByText("Photography Portfolio"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A collection of moments captured/i),
    ).toBeInTheDocument();
    expect(screen.getByText("My Hobbies & Passion")).toBeInTheDocument();
  });
});
