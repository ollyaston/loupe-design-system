import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmountToCents(value: string) {
  const amount = parseFloat(value);
  return Math.floor(amount * 100);
}

export function formatCentsToAmount(value: string) {
  const amount = parseFloat(value);
  return (amount / 100).toFixed(2);
}

export function formatOrderNumber(orderNumber: number | string): string {
  // Handle null, undefined, or invalid values
  if (orderNumber == null || orderNumber === "") {
    return "ORD-000";
  }

  const num =
    typeof orderNumber === "string" ? parseInt(orderNumber) : orderNumber;

  // Handle NaN or invalid numbers
  if (isNaN(num)) {
    return "ORD-000";
  }

  // Use dynamic padding: minimum 3 digits, but allow growth beyond 999
  const minDigits = 3;
  const orderStr = num.toString();
  const paddingLength = Math.max(minDigits, orderStr.length);
  return `ORD-${orderStr.padStart(paddingLength, "0")}`;
}

export function getOrderActivationDate(order: {
  startDate: string;
  billingAnchor?: number;
}): string {
  const startDate = new Date(order.startDate);
  const billingAnchor = order.billingAnchor;

  if (billingAnchor) {
    const anchorDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      billingAnchor,
    );

    if (anchorDate.getDate() < startDate.getDate()) {
      anchorDate.setMonth(anchorDate.getMonth() + 1);
    }

    return anchorDate.toLocaleDateString();
  }

  return startDate.toLocaleDateString();
}

export function isSalesforce(request: Request) {
  if (request.headers.get("referer")?.includes("salesforce.com")) {
    return true;
  }

  const url = new URL(request.url);

  if (url.searchParams.get("isSalesforce") === "true") {
    return true;
  }

  const state = url.searchParams.get("state");
  if (state) {
    const decodedState = Buffer.from(state, "base64").toString("utf-8");
    const decodedStateObj = JSON.parse(decodedState) as {
      returnTo: string;
    };
    if (
      decodedStateObj.returnTo &&
      decodedStateObj.returnTo.includes("isSalesforce=true")
    ) {
      return true;
    }
  }

  return false;
}

export function formatNumber(num: number): string {
  if (num === 0) {
    return `${num.toFixed(2)}`;
  } else if (num < 0.01) {
    return `${num.toFixed(4)}`;
  } else if (num < 10) {
    return `${num.toFixed(2)}`;
  } else if (num < 10000) {
    return `${num.toFixed(1)}`;
  } else if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else {
    return `${(num / 1000000).toFixed(1)}M`;
  }
}

export function clearKnockSession() {
  sessionStorage.removeItem("isKnockBootstrapped");
}

export function orderPlans<
  T extends {
    id: string;
    prevPlanId?: string | null;
    nextPlanId?: string | null;
  },
>(plans: T[]): T[] {
  if (!plans.length) return [];

  const planById = new Map(plans.map((plan) => [plan.id, plan]));

  const firstPlan =
    plans.find((plan) => plan.prevPlanId == null) ??
    plans.find(
      (plan) => plan.prevPlanId != null && !planById.has(plan.prevPlanId),
    ) ??
    plans[0];

  if (!firstPlan) return [];

  const result: T[] = [];
  let current: T | undefined = firstPlan;

  while (current && !result.includes(current)) {
    result.push(current);

    if (!current.nextPlanId) break;

    current = planById.get(current.nextPlanId);
    if (!current) break;
  }

  if (result.length !== plans.length) {
    const remaining = plans.filter((plan) => !result.includes(plan));
    result.push(...remaining);
  }

  return result;
}
