import { countries } from "./countries";

export const CURRENCIES = {
  GBP: {
    symbol: "£",
    // eslint-disable-next-line agent-loupe-ui/sentence-case
    name: "British Pound Sterling",
    locale: "en-GB",
    flag: "🇬🇧",
  },
  BRL: {
    symbol: "R$",
    // eslint-disable-next-line agent-loupe-ui/sentence-case
    name: "Brazilian Real",
    locale: "pt-BR",
    flag: "🇧🇷",
  },
  EUR: { symbol: "€", name: "Euro", locale: "de-DE", flag: "🇪🇺" },
  USD: { symbol: "$", name: "US Dollar", locale: "en-US", flag: "🇺🇸" },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

interface FormatCurrencyOptions {
  currency?: CurrencyCode;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showSymbol?: boolean;
}

/**
 * Formats a number as currency with proper locale and decimal formatting
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {},
): string {
  const {
    currency = "USD",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSymbol = true,
  } = options;

  const currencyInfo = CURRENCIES[currency];
  if (!currencyInfo) {
    throw new Error(`Unsupported currency: ${currency}`);
  }

  return new Intl.NumberFormat(currencyInfo.locale, {
    style: showSymbol ? "currency" : "decimal",
    currency: currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Gets the decimal separator for a specific currency
 */
export function getDecimalSeparator(currency: CurrencyCode): string {
  const currencyInfo = CURRENCIES[currency];
  if (!currencyInfo) return ".";

  // Create a test number format to extract the decimal separator
  const formatter = new Intl.NumberFormat(currencyInfo.locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const parts = formatter.formatToParts(1.1);
  const decimalPart = parts.find((part) => part.type === "decimal");
  return decimalPart?.value || ".";
}

/**
 * Formats a value to always show decimals with currency-specific formatting
 */
export function formatInputValue(
  value: string | number,
  currency: CurrencyCode,
): string {
  const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
  const decimalSeparator = getDecimalSeparator(currency);

  // Format with 2 decimal places
  const formatted = numValue.toFixed(2);

  // Replace dot with currency-specific decimal separator if needed
  if (decimalSeparator !== ".") {
    return formatted.replace(".", decimalSeparator);
  }

  return formatted;
}

/**
 * Creates a formatted placeholder with currency symbol and proper decimal formatting
 */
export function formatCurrencyPlaceholder(
  currency: CurrencyCode,
  amount: number = 0,
): string {
  const currencyInfo = CURRENCIES[currency];
  if (!currencyInfo) {
    throw new Error(`Unsupported currency: ${currency}`);
  }

  const formattedAmount = formatInputValue(amount, currency);
  return `${currencyInfo.symbol} ${formattedAmount}`;
}

/**
 * Formats a zero value with proper currency-specific decimal formatting
 */
export function formatZeroValue(currency: CurrencyCode): string {
  return formatInputValue(0, currency);
}

/**
 * Converts cents to amount with proper decimal formatting
 */
export function formatCentsToAmount(
  cents: number,
  currency: CurrencyCode = "USD",
): string {
  const amount = cents / 100;
  return formatInputValue(amount, currency);
}

/**
 * Converts amount string to cents, handling different decimal separators
 */
export function parseAmountToCents(
  value: string,
  currency: CurrencyCode = "USD",
): number {
  if (!value) return 0;

  const decimalSeparator = getDecimalSeparator(currency);

  // Normalize the decimal separator to dot for parsing
  const normalizedValue =
    decimalSeparator !== "." ? value.replace(decimalSeparator, ".") : value;

  const amount = parseFloat(normalizedValue) || 0;
  return Math.floor(amount * 100);
}

/**
 * Gets the currency symbol for a given currency code
 */
export function getCurrencySymbol(currencyCode: string): string {
  const currency = currencyCode as CurrencyCode;
  return CURRENCIES[currency]?.symbol || "$";
}

const getDigits = (currency: CurrencyCode): number => {
  return new Intl.NumberFormat(undefined, {
    currency,
    style: "currency",
  }).resolvedOptions().maximumFractionDigits as number;
};

export function convertCurrencyToMinor(
  amount: number,
  currency: CurrencyCode,
): number {
  return Math.round(amount * Math.pow(10, getDigits(currency)));
}

export function convertCurrencyFromMinor(
  amount: number,
  currency: CurrencyCode,
): number {
  return amount / Math.pow(10, getDigits(currency));
}

/**
 * Gets the currency code for a given country code
 */
export function getCurrencyFromCountry(
  countryCode: string,
  fallback: string = "USD",
) {
  return countries.find((c) => c.code === countryCode)?.currency ?? fallback;
}
