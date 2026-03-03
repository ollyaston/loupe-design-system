"use client";

import { IconBadge } from "@/design-system/icon-badge";
import { type IconName } from "@/design-system/icon";

type GemType = {
  id: string;
  color: string; // TODO - typed tailwind color
  icon: IconName;
};

export const gemTypes: GemType[] = [
  {
    id: "agents",
    color: "rosemary",
    icon: "robot_2",
  },
  {
    id: "credits",
    color: "coral",
    icon: "token",
  },
  {
    id: "customers",
    color: "pacific",
    icon: "account_circle",
  },
  {
    id: "orders",
    color: "cerulean",
    icon: "shopping_bag",
  },
  {
    id: "invoices",
    color: "amethyst",
    icon: "invoice",
  },
  {
    id: "payments",
    color: "orchid",
    icon: "attach_money",
  },
  {
    id: "favorites",
    color: "coral",
    icon: "favorite",
  },
  {
    id: "signals",
    color: "yolk",
    icon: "signals",
  },
  {
    id: "margins",
    color: "plum",
    icon: "margin",
  },
  {
    id: "workflows",
    color: "emerald",
    icon: "swap_calls",
  },
  {
    id: "consumption",
    color: "eggplant",
    icon: "graphic_eq",
  },
  {
    id: "builder",
    color: "earth",
    icon: "builder",
  },
  {
    id: "blocks",
    color: "jade",
    icon: "blocks",
  },
  {
    id: "package",
    color: "jade",
    icon: "package_2",
  },
  {
    id: "products",
    color: "jade",
    icon: "category",
  },
  {
    id: "simulations",
    color: "amethyst",
    icon: "science",
  },
  {
    id: "vendors",
    color: "lavender",
    icon: "local_atm",
  },
  {
    id: "payment-methods",
    color: "carmine",
    icon: "credit_card",
  },
  {
    id: "tax",
    color: "pacific",
    icon: "local_atm",
  },
  {
    id: "events",
    color: "sapphire",
    icon: "arrow_split",
  },
  {
    id: "hand_coins",
    color: "fawn",
    icon: "hand_coins",
  },
  {
    id: "quotes",
    color: "azure",
    icon: "request_quote",
  },
  {
    id: "corporate_fare",
    color: "carmine",
    icon: "corporate_fare",
  },
  {
    id: "rev_rec",
    color: "emerald",
    icon: "finance",
  },
  {
    id: "rule",
    color: "plum",
    icon: "rule",
  },
  {
    id: "settings",
    color: "slate",
    icon: "settings",
  },
  {
    id: "api",
    color: "slate",
    icon: "key",
  },
  // Deprecated?
  {
    id: "assistants",
    color: "pigeon",
    icon: "ai",
  },
] as const;

export type GemId = GemType["id"];

export const Gem = ({
  id,
  size = 32,
  darkMode,
  background = false,
}: {
  id: GemId;
  size?: number;
  darkMode?: boolean;
  background?: boolean;
}) => {
  const gemType = gemTypes.find((gemType) => gemType.id === id);
  if (!gemType) {
    return null;
  }
  const { icon, color } = gemType;

  return (
    <div className="loupe-system">
      <IconBadge
        icon={icon}
        size={size}
        backgroundColor={background ? color : undefined}
        foregroundColor={color}
        darkMode={darkMode}
      />
    </div>
  );
};
