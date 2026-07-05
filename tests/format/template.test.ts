import { describe, it, expect } from "vitest";
import { fillTemplate, hasRawPlaceholders, stripPlaceholders } from "../../src/lib/format/template";

describe("fillTemplate", () => {
  it("replaces all placeholders with provided values", () => {
    const text = "Bekijk wat je overhoudt bij {{inkomen}} per jaar.";
    expect(fillTemplate(text, { inkomen: "€ 35.000" }, "fallback")).toBe(
      "Bekijk wat je overhoudt bij € 35.000 per jaar.",
    );
  });

  it("returns fallback when any placeholder is missing", () => {
    const text = "Bekijk wat je overhoudt bij {{inkomen}} per jaar.";
    expect(fillTemplate(text, {}, "Veilige fallback tekst.")).toBe("Veilige fallback tekst.");
  });

  it("returns fallback when a placeholder value is empty string", () => {
    const text = "Bekijk wat je overhoudt bij {{inkomen}} per jaar.";
    expect(fillTemplate(text, { inkomen: "" }, "Veilige fallback tekst.")).toBe(
      "Veilige fallback tekst.",
    );
  });

  it("keeps text without placeholders unchanged", () => {
    const text = "Geen placeholders hier.";
    expect(fillTemplate(text, {}, "fallback")).toBe("Geen placeholders hier.");
  });
});

describe("hasRawPlaceholders", () => {
  it("detects raw {{...}} placeholders", () => {
    expect(hasRawPlaceholders("Reken {{bedrag}} om.")).toBe(true);
  });

  it("returns false for clean text", () => {
    expect(hasRawPlaceholders("Reken bedragen om.")).toBe(false);
  });
});

describe("stripPlaceholders", () => {
  it("removes raw placeholders from text", () => {
    expect(stripPlaceholders("Reken {{bedrag}} om.")).toBe("Reken om.");
  });

  it("returns clean text unchanged", () => {
    expect(stripPlaceholders("Reken bedragen om.")).toBe("Reken bedragen om.");
  });
});
