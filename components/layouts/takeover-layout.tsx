export function TakeoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen text-sidebar-foreground bg-sidebar p-2 overflow-hidden flex items-center justify-center text-center">
      <div className="w-full max-w-sm mx-auto px-4 py-[20vh] text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
