/**
 * All money in the engine is integer cents. These helpers are the only place
 * dollars appear, and only for display or user input.
 */

export type Cents = number;

export function assertCents(value: number): Cents {
  if (!Number.isInteger(value)) {
    throw new Error(`Money must be integer cents, got ${value}`);
  }
  return value;
}

export function dollarsToCents(dollars: number): Cents {
  return Math.round(dollars * 100);
}

export function formatCents(cents: Cents): string {
  assertCents(cents);
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const rem = abs % 100;
  return rem === 0
    ? `${sign}$${dollars}`
    : `${sign}$${dollars}.${String(rem).padStart(2, "0")}`;
}
