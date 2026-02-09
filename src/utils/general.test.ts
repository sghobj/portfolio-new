import { describe, expect, it, vi } from "vitest";
import { formatDate, getStrapiMedia } from "./general";

describe("general utils", () => {
  describe("formatDate", () => {
    it("should format Date object correctly", () => {
      const date = new Date(2024, 0, 15); // Jan 15, 2024
      expect(formatDate(date)).toBe("01.2024");
    });

    it("should format date string correctly", () => {
      expect(formatDate("2024-05-20")).toBe("05.2024");
    });

    it("should throw error for invalid date string", () => {
      expect(() => formatDate("invalid-date")).toThrow(
        "Invalid date string provided",
      );
    });
  });

  describe("getStrapiMedia", () => {
    const baseUrl = "http://localhost:1337";

    it("should return empty string if url is null or undefined", () => {
      expect(getStrapiMedia(null)).toBe("");
      expect(getStrapiMedia(undefined)).toBe("");
    });

    it("should return url as is if it starts with http", () => {
      const url = "http://example.com/image.jpg";
      expect(getStrapiMedia(url)).toBe(url);
    });

    it("should return url as is if it starts with //", () => {
      const url = "//example.com/image.jpg";
      expect(getStrapiMedia(url)).toBe(url);
    });

    it("should prefix relative url with VITE_STRAPI_BASE_URL", () => {
      vi.stubEnv("VITE_STRAPI_BASE_URL", baseUrl);
      const url = "/uploads/image.jpg";
      expect(getStrapiMedia(url)).toBe(`${baseUrl}${url}`);
      vi.unstubAllEnvs();
    });
  });
});
