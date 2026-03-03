"use client";

import { cn } from "@/lib/utils";

import {
  AiIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BlocksIcon,
  BuilderIcon,
  BurstsIcon,
  InvoiceIcon,
  OverviewIcon,
  SignalsIcon,
  SlashIcon,
  TaxIcon,
  GmailIcon,
  OutlookIcon,
  GoogleIcon,
  GithubIcon,
  WindowsIcon,
  Robot2Icon,
  // TokenIcon,
  AccountCircleIcon,
  ShoppingBagIcon,
  AttachMoneyIcon,
  FavoriteIcon,
  MarginIcon,
  SwapCallsIcon,
  GraphicEqIcon,
  LanguageIcon,
  CreditCardIcon,
  LocalAtmIcon,
  HomeIcon,
  ExploreIcon,
  SettingsIcon,
  LeftPanelOpenIcon,
  LeftPanelClosedIcon,
  CodeIcon,
  KeyboardArrowDownIcon,
  ChatBubbleIcon,
  FeedbackIcon,
  ArrowDownwardIcon,
  ExpandAllIcon,
  ArrowSplitIcon,
  HandCoinsIcon,
  ScienceIcon,
} from "./icons";

// To add a new custom Loupe icon:
// 1. Add the icon to the AP_ICONS object below
// 2. Create a React component in design-system/icons/index.tsx

const AP_ICONS_MAP = {
  // Custom icons not available as Material Symbols.
  ai: AiIcon,
  arrow_down_right: ArrowDownRightIcon,
  arrow_up_right: ArrowUpRightIcon,
  blocks: BlocksIcon,
  builder: BuilderIcon,
  bursts: BurstsIcon,
  invoice: InvoiceIcon,
  overview: OverviewIcon,
  signals: SignalsIcon,
  slash: SlashIcon,
  tax: TaxIcon,
  hand_coins: HandCoinsIcon,

  // Colored brand logos
  gmail: GmailIcon,
  outlook: OutlookIcon,
  google: GoogleIcon,
  github: GithubIcon,
  windows: WindowsIcon,

  // ------------------------------------------------------------

  // These icons work as Material Symbols just fine, and don't NEED to be custom.
  // However, making them custom and importing them as SVGs directly prevents FOUC on page load,
  // which is nice for commonly-used icons like the ones in the sidebar.

  // Gems
  robot_2: Robot2Icon,
  // token: TokenIcon,
  account_circle: AccountCircleIcon,
  shopping_bag: ShoppingBagIcon,
  attach_money: AttachMoneyIcon,
  favorite: FavoriteIcon,
  margin: MarginIcon,
  swap_calls: SwapCallsIcon,
  graphic_eq: GraphicEqIcon,
  language: LanguageIcon,
  credit_card: CreditCardIcon,
  local_atm: LocalAtmIcon,
  arrow_split: ArrowSplitIcon,
  science: ScienceIcon,

  // Other icons
  home: HomeIcon,
  explore: ExploreIcon,
  settings: SettingsIcon,
  left_panel_open: LeftPanelOpenIcon,
  left_panel_closed: LeftPanelClosedIcon,
  code: CodeIcon,
  keyboard_arrow_down: KeyboardArrowDownIcon,
  chat_bubble: ChatBubbleIcon,
  feedback: FeedbackIcon,
  arrow_downward: ArrowDownwardIcon,
  expand_all: ExpandAllIcon,
};

export const AP_ICONS = Object.keys(AP_ICONS_MAP);

export type IconName = keyof typeof AP_ICONS_MAP | (string & {});

export const Icon = ({
  name,
  size,
  className,
}: {
  name: IconName;
  size: number;
  className?: string;
}) => {
  if (AP_ICONS.includes(name)) {
    const IconComponent = AP_ICONS_MAP[name as keyof typeof AP_ICONS_MAP];
    return (
      <IconComponent
        className={cn("loupe-system", "shrink-0", className)}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <span
      className={cn("loupe-system", "material-symbols-outlined", className)}
      style={{
        display: "inline-block",
        fontSize: size,
        width: size,
        height: size,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {name}
    </span>
  );
};

Icon.displayName = "Icon";
