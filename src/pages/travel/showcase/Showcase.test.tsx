import { render, screen } from "@testing-library/react";
import { Showcase } from "./Showcase";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "../../../components/ui/provider.tsx";
import { MockedProvider } from "@apollo/client/testing";
import { PHOTOS_QUERY } from "../../../queries/photos.ts";
import { GeneralProvider } from "../../../context/GeneralContext.tsx";

// Mock framer-motion
vi.mock("framer-motion", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  const React = await import("react");

  const motionMock = (component: React.ElementType) => {
    return React.forwardRef<HTMLElement, Record<string, unknown>>(
      (props, ref) => {
        const {
          whileInView,
          onViewportEnter,
          viewport,
          initial,
          animate,
          variants,
          transition,
          ...rest
        } = props;

        void whileInView;
        void onViewportEnter;
        void viewport;
        void initial;
        void animate;
        void variants;
        void transition;

        return React.createElement(component as string, { ...rest, ref });
      },
    );
  };

  const motionProxy = new Proxy(motionMock, {
    get: (target, prop) => {
      if (typeof prop === "string" && prop !== "forwardRef") {
        return motionMock(prop as React.ElementType);
      }
      return Reflect.get(target, prop);
    },
  });

  return {
    ...actual,
    motion: motionProxy,
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
      <GeneralProvider>
        <Provider>{ui}</Provider>
      </GeneralProvider>
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
    expect(screen.getByText("sarah_ghobj")).toBeInTheDocument();
  });

  it("handles loading state", () => {
    const loadingMocks = [
      {
        request: {
          query: PHOTOS_QUERY,
          variables: { folder: "travel-showcase" },
        },
        result: { data: null },
        delay: 1000,
      },
    ];
    render(
      <MockedProvider mocks={loadingMocks}>
        <GeneralProvider>
          <Provider>
            <Showcase />
          </Provider>
        </GeneralProvider>
      </MockedProvider>,
    );
    // Should not crash
  });

  it("handles error state", async () => {
    const errorMocks = [
      {
        request: {
          query: PHOTOS_QUERY,
          variables: { folder: "travel-showcase" },
        },
        error: new Error("Failed to fetch"),
      },
    ];
    render(
      <MockedProvider mocks={errorMocks}>
        <GeneralProvider>
          <Provider>
            <Showcase />
          </Provider>
        </GeneralProvider>
      </MockedProvider>,
    );
    expect(
      await screen.findByText(/Error loading photos/i),
    ).toBeInTheDocument();
  });
});
