import { describe, expect, it } from "vitest";
import { assertCents, dollarsToCents, formatCents } from "./money";

describe("money", () => {
  it("converts dollars to integer cents without float drift", () => {
    expect(dollarsToCents(0.1 + 0.2)).toBe(30);
    expect(dollarsToCents(5)).toBe(500);
  });

  it("formats cents for display", () => {
    expect(formatCents(500)).toBe("$5");
    expect(formatCents(1250)).toBe("$12.50");
    expect(formatCents(-705)).toBe("-$7.05");
  });

  it("rejects fractional cents", () => {
    expect(() => assertCents(1.5)).toThrow();
  });
});
