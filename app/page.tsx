import { Heading } from "@/design-system/heading";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      {/* eslint-disable-next-line agent-loupe-ui/sentence-case -- brand name */}
        <Heading title="Loupe Design System" size="large" />
      <p className="mt-2 text-muted-foreground">
        This is a design-system-only project. Use Storybook to explore
        components.
      </p>
    </main>
  );
}
