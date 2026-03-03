import * as React from "react";
import { InfoHover } from "../design-system/info-hover";
import { Icon } from "../design-system/icon";
import { Sparkline } from "../design-system/highchart";
import { formatNumber, isNumericString } from "../design-system/format-number";
import { Tooltip } from "../design-system/tooltip";
import { Card } from "../design-system/card";
import { getCurrencySymbol } from "@/lib/currency";

interface KPIProps {
  label: string;
  value: string;
  prefix?: string;
  currency?: string;
  change?: {
    value: string;
    trend?: "up" | "down";
  };
  showChange?: boolean;
  simulatedValue?: string;
  isLoading?: boolean;
  disabled?: boolean;
  tooltip?: string;
  description?: string;
  sparklineData?: number[];
  variant?: "default" | "secondary";
  /** Whether to format numeric values using human-readable format (e.g., 1234 -> 1.2k) */
  formatNumbers?: boolean;
}

interface KpiRowProps {
  kpis: Array<Omit<KPIProps, "variant">>;
  variant?: "default" | "secondary";
}

export function KPI({
  label,
  value,
  prefix,
  currency,
  change,
  showChange = false,
  simulatedValue,
  isLoading,
  disabled = false,
  tooltip,
  description,
  sparklineData,
  variant = "default",
  formatNumbers = false,
}: KPIProps) {
  // Determine the display prefix: currency symbol takes precedence over prefix
  const displayPrefix = React.useMemo(() => {
    if (currency) {
      return getCurrencySymbol(currency);
    }
    return prefix;
  }, [currency, prefix]);
  // Ensure value is always a string (safety check for runtime type issues)
  const safeValue = React.useMemo(() => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    // Handle unexpected object/array types
    console.warn("KPI received non-string value:", typeof value, value);
    return "0";
  }, [value]);

  // Format numeric values if requested
  const formattedValue = React.useMemo(() => {
    if (!formatNumbers || !isNumericString(safeValue)) return safeValue;
    return formatNumber(safeValue);
  }, [safeValue, formatNumbers]);

  const formattedSimulatedValue = React.useMemo(() => {
    if (!formatNumbers || !simulatedValue || !isNumericString(simulatedValue))
      return simulatedValue;
    return formatNumber(simulatedValue);
  }, [simulatedValue, formatNumbers]);

  const formattedChangeValue = React.useMemo(() => {
    if (!formatNumbers || !change?.value || !isNumericString(change.value))
      return change?.value;
    return formatNumber(change.value);
  }, [change?.value, formatNumbers]);

  // Check if we should show tooltips for formatted values
  const shouldShowValueTooltip = React.useMemo(() => {
    if (!formatNumbers || !isNumericString(safeValue)) return false;
    return formatNumber(safeValue) !== safeValue;
  }, [safeValue, formatNumbers]);

  const shouldShowSimulatedValueTooltip = React.useMemo(() => {
    if (!formatNumbers || !simulatedValue || !isNumericString(simulatedValue))
      return false;
    return formatNumber(simulatedValue) !== simulatedValue;
  }, [simulatedValue, formatNumbers]);

  const shouldShowChangeValueTooltip = React.useMemo(() => {
    if (!formatNumbers || !change?.value || !isNumericString(change.value))
      return false;
    return formatNumber(change.value) !== change.value;
  }, [change?.value, formatNumbers]);

  const sparklineColor =
    change?.trend === "up"
      ? "#10b981"
      : change?.trend === "down"
        ? "#ef4444"
        : disabled
          ? "#9ca3af"
          : "#3b82f6";

  // Helper function to wrap value with tooltip if needed
  const wrapWithTooltip = (
    formattedValue: string,
    originalValue: string,
    shouldShow: boolean,
  ) => {
    if (!shouldShow) {
      return <span>{formattedValue}</span>;
    }

    return (
      <Tooltip content={<p>{originalValue}</p>}>
        <span className="cursor-help">{formattedValue}</span>
      </Tooltip>
    );
  };

  return (
    <Card
      variant={variant}
      className={`rounded-lg h-full flex flex-col overflow-hidden ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <div
        className={`p-6 flex flex-col gap-1 flex-1 ${sparklineData && sparklineData.length > 0 ? "pb-0" : ""}`}
      >
        <div
          className={`font-medium text-xs flex items-center justify-between gap-4 uppercase tracking-wide ${
            disabled ? "text-muted-foreground" : "text-muted-foreground"
          }`}
        >
          <div className="flex items-center gap-1 min-w-0">
            <span className="truncate">{label}</span>
            {tooltip && <InfoHover content={tooltip} />}
          </div>
          {!simulatedValue && showChange && change && (
            <div
              className={`flex items-center flex-shrink-0 px-1 gap-1 rounded-full border ${
                change.trend === "up"
                  ? "text-success border-success"
                  : change.trend === "down"
                    ? "text-warning border-warning"
                    : "text-muted-foreground border-muted-foreground"
              }`}
            >
              {change.trend === "up" && (
                <Icon name="arrow_up_right" size={12} />
              )}
              {change.trend === "down" && (
                <Icon name="arrow_down_right" size={12} />
              )}
              <span className="font-medium text-xs font-mono">
                {wrapWithTooltip(
                  formattedChangeValue || "",
                  change?.value || "",
                  shouldShowChangeValueTooltip,
                )}
              </span>
            </div>
          )}
        </div>
        {/* eslint-disable agent-loupe-ui/large-text-classes -- KPI displays numeric values; Heading is for titles */}
        <div
          className={`text-2xl font-semibold font-mono tracking-tight pt-1 overflow-hidden transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}
        >
          {/* eslint-enable agent-loupe-ui/large-text-classes */}
          {formattedSimulatedValue ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {displayPrefix && (
                  <span className="text-muted-foreground">{displayPrefix}</span>
                )}
                <span className="text-muted-foreground">
                  {wrapWithTooltip(
                    formattedValue,
                    safeValue,
                    shouldShowValueTooltip,
                  )}
                </span>
              </div>
              <Icon name="arrow_forward" size={16} className="text-success" />
              <div className="flex items-center">
                {displayPrefix && <span>{displayPrefix}</span>}
                <span>
                  {wrapWithTooltip(
                    formattedSimulatedValue,
                    simulatedValue || "",
                    shouldShowSimulatedValueTooltip,
                  )}
                </span>
              </div>
            </div>
          ) : (
            <>
              {displayPrefix && <span>{displayPrefix}</span>}
              {wrapWithTooltip(
                formattedValue,
                safeValue,
                shouldShowValueTooltip,
              )}
            </>
          )}
        </div>
        {description && (
          <div
            className={`mt-5 text-[0.6875rem] font-mono uppercase tracking-wide ${disabled ? "text-muted-foreground" : "text-muted-foreground"}`}
          >
            {description}
          </div>
        )}
      </div>
      {sparklineData && sparklineData.length > 0 && (
        <div className="w-full pr-6">
          <Sparkline data={sparklineData} color={sparklineColor} height={40} />
        </div>
      )}
    </Card>
  );
}

export function KpiRow({ kpis, variant = "default" }: KpiRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KPI key={`${kpi.label}-${index}`} {...kpi} variant={variant} />
      ))}
    </div>
  );
}
