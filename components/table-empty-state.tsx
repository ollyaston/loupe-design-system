import { EmptyState } from "../design-system/empty-state";

/** Generic empty state presets for tables. Use "custom" with title/description/cta for app-specific copy. */
export const emptyStates = {
  items: {
    title: "No items yet",
    description:
      "Add your first item to get started. Data will appear here once created.",
    cta: "Add item",
  },
  data: {
    title: "No data",
    description: "Connect a data source or add data to see it here.",
    cta: "Connect data",
  },
  results: {
    title: "No results found",
    description:
      "Try adjusting your search or filters to find what you’re looking for.",
    cta: "Clear filters",
  },
  team: {
    title: "No team members yet",
    description: "Invite people to collaborate and manage access together.",
    cta: "Invite team",
  },
  integrations: {
    title: "No integrations connected",
    description:
      "Connect your tools to streamline workflows and sync data automatically.",
    cta: "Connect integration",
  },
  records: {
    title: "No records yet",
    description: "Records will appear here once they’re created or imported.",
    cta: "Add record",
  },
  /** Use with custom title, description, and cta for app-specific empty states. */
  custom: {
    title: "",
    description: "",
    cta: "Add",
  },
} as const;

export type EmptyStateType = keyof typeof emptyStates;

export type TableEmptyStateProps =
  | {
      type: EmptyStateType;
      onCtaClick?: () => void;
      /** Override preset title when using a preset type (except "custom"). */
      title?: string;
      /** Override preset description when using a preset type (except "custom"). */
      description?: string;
      /** Override preset CTA label when using a preset type (except "custom"). */
      cta?: string;
    }
  | {
      type: "custom";
      title: string;
      description?: string;
      cta?: string;
      onCtaClick?: () => void;
    };

export function TableEmptyState({
  type,
  onCtaClick,
  title: titleOverride,
  description: descriptionOverride,
  cta: ctaOverride,
}: TableEmptyStateProps) {
  const preset = emptyStates[type];
  const title =
    type === "custom" ? titleOverride! : (titleOverride ?? preset.title);
  const description =
    type === "custom"
      ? descriptionOverride
      : (descriptionOverride ?? preset.description);
  const cta =
    type === "custom"
      ? (ctaOverride ?? preset.cta)
      : (ctaOverride ?? preset.cta);

  return (
    <EmptyState
      title={title}
      description={description}
      action={
        onCtaClick && cta
          ? {
              label: cta,
              onClick: onCtaClick,
            }
          : undefined
      }
    />
  );
}
