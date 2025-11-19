import { describe, expect, it } from "vitest";
import { links } from "./general.tsx";
import { FaHome, FaUser } from "react-icons/fa";

describe("links array", () => {
  it("should have the correct number of links", () => {
    expect(links.length).toBe(3);
  });

  it("should have correct labels and hrefs", () => {
    expect(links[0]).toMatchObject({ label: "Home", href: "/" });
    expect(links[1]).toMatchObject({ label: "CV", href: "/cv" });
    expect(links[2]).toMatchObject({
      label: "Showcase",
      href: "/travel/showcase",
    });
  });

  it("should use correct icons", () => {
    expect(links[0].icon.type).toBe(FaHome);
    expect(links[1].icon.type).toBe(FaUser);
    expect(links[2].icon.type).toBe(FaUser);
  });
});
