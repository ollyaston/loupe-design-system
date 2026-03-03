import { Heading } from "@/design-system/heading";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <Heading title="Loupe design system" size="large" />
      <p className="mt-2 text-muted-foreground">
        This is a design-system-only project. Use Storybook to explore
        components.
      </p>
    </main>
  );
}
