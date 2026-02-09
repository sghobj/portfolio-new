import { fireEvent, render, screen } from "@testing-library/react";
import { ContactMe } from "./ContactMe";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "../ui/provider.tsx";
import { MockedProvider } from "@apollo/client/testing";
import { CONTACTS_QUERY } from "../../queries/contacts-query.ts";

const mockContactsData = {
  cv: {
    contactLinks: {
      socialMedia: [
        { name: "LinkedIn", href: "https://linkedin.com/in/sarah" },
        { name: "Instagram", href: "https://instagram.com/sarah" },
      ],
      email: "sarah@example.com",
    },
  },
};

const mocks = [
  {
    request: {
      query: CONTACTS_QUERY,
    },
    result: {
      data: mockContactsData,
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

describe("ContactMe Component", () => {
  beforeEach(() => {
    vi.spyOn(window, "open").mockImplementation(() => null);
    // @ts-expect-error - window.location is read-only in some environments
    delete window.location;
    // @ts-expect-error - window.location is read-only in some environments
    window.location = { href: "" };

    // matchMedia is already mocked in setupTests.ts, but if some tests interfere with global window
    // it's safer to ensure it's there if window was modified.
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders social media icons and handles click", async () => {
    renderWithProviders(<ContactMe />);

    // Need to wait for the query to resolve and state to update
    const linkedInIcon = await screen.findByLabelText("LinkedIn");
    const instagramIcon = await screen.findByLabelText("Instagram");

    expect(linkedInIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();

    fireEvent.click(linkedInIcon);
    expect(window.open).toHaveBeenCalledWith(
      "https://linkedin.com/in/sarah",
      "_blank",
    );
  });

  it("handles email icon click", async () => {
    // Redefine location for this test specifically
    const mockLocation = { href: "" };
    // @ts-expect-error - window.location is read-only
    delete window.location;
    // @ts-expect-error - window.location is read-only
    window.location = mockLocation;

    renderWithProviders(<ContactMe />);

    const emailIcon = await screen.findByLabelText("Email");
    expect(emailIcon).toBeInTheDocument();

    fireEvent.click(emailIcon);
    expect(mockLocation.href).toBe("mailto:sarah@example.com");
  });
});
