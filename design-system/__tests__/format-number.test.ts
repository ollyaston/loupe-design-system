import { expect, describe, it } from "vitest";
import {
  formatNumber,
  isNumericString,
  extractNumericValue,
} from "../format-number";

describe("formatNumber", () => {
  describe("basic number formatting", () => {
    it("should format thousands with k suffix", () => {
      expect(formatNumber(1000)).toBe("1k");
      expect(formatNumber(1500)).toBe("1.5k");
      expect(formatNumber(1234)).toBe("1.2k");
      expect(formatNumber(9999)).toBe("10k");
    });

    it("should format millions with M suffix", () => {
      expect(formatNumber(1000000)).toBe("1M");
      expect(formatNumber(1500000)).toBe("1.5M");
      expect(formatNumber(1234567)).toBe("1.2M");
      expect(formatNumber(9999999)).toBe("10M");
    });

    it("should format billions with B suffix", () => {
      expect(formatNumber(1000000000)).toBe("1B");
      expect(formatNumber(1500000000)).toBe("1.5B");
      expect(formatNumber(1234567890)).toBe("1.2B");
    });

    it("should format trillions with T suffix", () => {
      expect(formatNumber(1000000000000)).toBe("1T");
      expect(formatNumber(1500000000000)).toBe("1.5T");
    });

    it("should handle numbers less than 1000 without suffix", () => {
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(1)).toBe("1");
      expect(formatNumber(100)).toBe("100");
      expect(formatNumber(999)).toBe("999");
    });

    it("should handle negative numbers", () => {
      expect(formatNumber(-1000)).toBe("-1k");
      expect(formatNumber(-1500)).toBe("-1.5k");
      expect(formatNumber(-1234567)).toBe("-1.2M");
    });
  });

  describe("string input handling", () => {
    it("should format numeric strings", () => {
      expect(formatNumber("1000")).toBe("1k");
      expect(formatNumber("1500")).toBe("1.5k");
      expect(formatNumber("1234567")).toBe("1.2M");
    });

    it("should handle formatted strings with commas", () => {
      expect(formatNumber("1,000")).toBe("1k");
      expect(formatNumber("1,500")).toBe("1.5k");
      expect(formatNumber("1,234,567")).toBe("1.2M");
    });

    it("should handle currency formatted strings", () => {
      expect(formatNumber("$1,000")).toBe("1k");
      expect(formatNumber("$1,500")).toBe("1.5k");
      expect(formatNumber("€1,234,567")).toBe("1.2M");
    });

    it("should preserve non-numeric strings when preserveNonNumeric is true", () => {
      expect(formatNumber("hello")).toBe("hello");
      expect(formatNumber("N/A")).toBe("N/A");
      expect(formatNumber("--")).toBe("--");
    });

    it("should return 0 for non-numeric strings when preserveNonNumeric is false", () => {
      expect(formatNumber("hello", { preserveNonNumeric: false })).toBe("0");
      expect(formatNumber("N/A", { preserveNonNumeric: false })).toBe("0");
    });
  });

  describe("decimal options", () => {
    it("should respect decimal places option", () => {
      expect(formatNumber(1234)).toBe("1.2k");
      expect(formatNumber(1234, { decimals: 0 })).toBe("1k");
      expect(formatNumber(1234, { decimals: 1 })).toBe("1.2k");
      expect(formatNumber(1234, { decimals: 2 })).toBe("1.23k");
      expect(formatNumber(1234, { decimals: 3 })).toBe("1.234k");
    });

    it("should not show decimals for whole numbers by default", () => {
      expect(formatNumber(1000)).toBe("1k");
      expect(formatNumber(2000)).toBe("2k");
      expect(formatNumber(1000000)).toBe("1M");
    });

    it("should show decimals for whole numbers when showDecimalsForWhole is true", () => {
      expect(formatNumber(1000, { showDecimalsForWhole: true })).toBe("1.0k");
      expect(formatNumber(2000, { showDecimalsForWhole: true })).toBe("2.0k");
      expect(formatNumber(1000000, { showDecimalsForWhole: true })).toBe(
        "1.0M",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle zero", () => {
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber("0")).toBe("0");
    });

    it("should handle very small numbers", () => {
      expect(formatNumber(0.1)).toBe("0.1");
      expect(formatNumber(0.01)).toBe("0.0"); // Very small numbers get rounded to 0.0
    });

    it("should handle empty string", () => {
      expect(formatNumber("")).toBe("");
      expect(formatNumber("", { preserveNonNumeric: false })).toBe("0");
    });

    it("should handle undefined and null", () => {
      expect(formatNumber(undefined as any)).toBe("undefined");
      expect(formatNumber(null as any)).toBe("0"); // null gets converted to 0
    });

    it("should handle negative numbers with currency symbols", () => {
      expect(formatNumber("-$1,000")).toBe("-1k");
      expect(formatNumber("-$1,500")).toBe("-1.5k");
      expect(formatNumber("€-1,234,567")).toBe("-1.2M");
      expect(formatNumber("$-1,234.56")).toBe("-1.2k");
    });

    it("should handle negative string values consistently", () => {
      expect(formatNumber("-1000")).toBe("-1k");
      expect(formatNumber("-1,000")).toBe("-1k");
      expect(formatNumber("-$1,000")).toBe("-1k");
      expect(formatNumber("-€1,000")).toBe("-1k");
    });
  });
});

describe("isNumericString", () => {
  it("should identify numeric strings", () => {
    expect(isNumericString("123")).toBe(true);
    expect(isNumericString("123.45")).toBe(true);
    expect(isNumericString("1,234")).toBe(true);
    expect(isNumericString("$1,234")).toBe(true);
    expect(isNumericString("€1,234.56")).toBe(true);
    expect(isNumericString("123%")).toBe(true);
  });

  it("should reject non-numeric strings", () => {
    expect(isNumericString("hello")).toBe(false);
    expect(isNumericString("N/A")).toBe(false);
    expect(isNumericString("--")).toBe(false);
    expect(isNumericString("")).toBe(false);
  });
});

describe("extractNumericValue", () => {
  it("should extract numeric values from formatted strings", () => {
    expect(extractNumericValue("$1,234")).toBe(1234);
    expect(extractNumericValue("€1,234.56")).toBe(1234.56);
    expect(extractNumericValue("123%")).toBe(123);
    expect(extractNumericValue("1,234,567")).toBe(1234567);
  });

  it("should return 0 for non-numeric strings", () => {
    expect(extractNumericValue("hello")).toBe(0);
    expect(extractNumericValue("N/A")).toBe(0);
    expect(extractNumericValue("")).toBe(0);
  });
});
