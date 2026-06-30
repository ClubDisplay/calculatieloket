import { describe, expect, it } from "vitest";
import {
  formatEuro,
  formatEuroHtml,
  formatNumber,
} from "../../src/lib/format/currency";

describe("format/currency", () => {
  describe("formatNumber", () => {
    it("uses Dutch decimal and thousand separators", () => {
      expect(formatNumber(1234.56, 2)).toBe("1.234,56");
      expect(formatNumber(1234.56, 0)).toBe("1.235");
      expect(formatNumber(1000000, 0)).toBe("1.000.000");
    });

    it("returns em-dash for non-finite values", () => {
      expect(formatNumber(NaN)).toBe("—");
      expect(formatNumber(Infinity)).toBe("—");
    });
  });

  describe("formatEuro", () => {
    it("returns em-dash for non-finite values", () => {
      expect(formatEuro(NaN)).toBe("—");
      expect(formatEuro(Infinity)).toBe("—");
    });

    it("formats with a normal space", () => {
      expect(formatEuro(1234.56, 2)).toBe("€ 1.234,56");
      expect(formatEuro(1234.56, 0)).toBe("€ 1.235");
    });
  });

  describe("formatEuroHtml", () => {
    it("returns em-dash for non-finite values", () => {
      expect(formatEuroHtml(NaN)).toBe("—");
      expect(formatEuroHtml(Infinity)).toBe("—");
    });

    it("formats with HTML entities for euro sign and non-breaking space", () => {
      expect(formatEuroHtml(1234.56, 2)).toBe("&euro;&nbsp;1.234,56");
      expect(formatEuroHtml(1234.56, 0)).toBe("&euro;&nbsp;1.235");
    });
  });
});
