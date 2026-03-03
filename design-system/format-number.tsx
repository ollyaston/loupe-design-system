/**
 * Formats a number into a human-readable string with appropriate suffixes (k, M, B, T)
 * Only affects numeric values, leaves text unchanged
 *
 * @param value - The value to format (string or number)
 * @param options - Formatting options
 * @returns Formatted string
 */
export function formatNumber(
  value: string | number,
  options: {
    /** Whether to preserve the original value if it's not a valid number */
    preserveNonNumeric?: boolean;
    /** Number of decimal places to show (default: 1) */
    decimals?: number;
    /** Whether to show decimal places for whole numbers (default: false) */
    showDecimalsForWhole?: boolean;
  } = {},
): string {
  const {
    preserveNonNumeric = true,
    decimals = 1,
    showDecimalsForWhole = false,
  } = options;

  // If value is already a string, try to parse it
  const numericValue =
    typeof value === "string"
      ? parseFloat(value.replace(/[,$%€£¥₹]/g, ""))
      : value;

  // If not a valid number and preserveNonNumeric is true, return original
  if (isNaN(numericValue)) {
    return preserveNonNumeric ? String(value) : "0";
  }

  // Handle zero
  if (numericValue === 0) {
    return "0";
  }

  const absValue = Math.abs(numericValue);
  const sign = numericValue < 0 ? "-" : "";

  // Determine the appropriate suffix and divisor
  let suffix = "";
  let divisor = 1;

  if (absValue >= 1e12) {
    suffix = "T";
    divisor = 1e12;
  } else if (absValue >= 1e9) {
    suffix = "B";
    divisor = 1e9;
  } else if (absValue >= 1e6) {
    suffix = "M";
    divisor = 1e6;
  } else if (absValue >= 1e3) {
    suffix = "k";
    divisor = 1e3;
  }

  // Calculate the formatted number
  const formattedValue = absValue / divisor;

  // Determine if we should show decimals
  const shouldShowDecimals = showDecimalsForWhole || formattedValue % 1 !== 0;
  const decimalPlaces = shouldShowDecimals ? decimals : 0;

  // Format the number
  const roundedValue = Number(formattedValue.toFixed(decimalPlaces));

  // Handle the case where roundedValue is 0 but original value was not 0
  if (roundedValue === 0 && absValue > 0) {
    return `${sign}${formattedValue.toFixed(decimalPlaces)}${suffix}`;
  }

  // For showDecimalsForWhole, ensure we show the decimal places even for whole numbers
  if (showDecimalsForWhole && decimalPlaces > 0) {
    return `${sign}${formattedValue.toFixed(decimalPlaces)}${suffix}`;
  }

  return `${sign}${roundedValue}${suffix}`;
}

/**
 * Checks if a string represents a numeric value (including formatted numbers with commas, currency symbols, etc.)
 */
export function isNumericString(value: string): boolean {
  // Remove common formatting characters and check if the result is a valid number
  const cleaned = value.replace(/[,$%€£¥₹]/g, "").trim();
  return !isNaN(parseFloat(cleaned)) && isFinite(parseFloat(cleaned));
}

/**
 * Extracts numeric value from a formatted string (removes currency symbols, commas, etc.)
 */
export function extractNumericValue(value: string): number {
  const cleaned = value.replace(/[,$%€£¥₹]/g, "").trim();
  return parseFloat(cleaned) || 0;
}
