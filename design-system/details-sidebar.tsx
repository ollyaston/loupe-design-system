"use client";

interface SidebarProp {
  title: string;
  value: any;
}

export default function DetailsSidebar({
  properties,
  actions,
}: {
  properties: SidebarProp[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="loupe-system pl-2">
      <h2 className="text-sm font-semibold flex justify-between items-center">
        Details
        {actions && actions}
      </h2>
      <div className="flex flex-col gap-4 py-4">
        {properties.map((prop: SidebarProp) => (
          <div key={prop.title} className="flex flex-col gap-1.5">
            <p className="text-xs font-normal leading-4 text-muted-foreground">
              {prop.title}
            </p>
            <div className="text-sm font-normal text-primary">
              {typeof prop.value === "string" ? (
                <p>{prop.value}</p>
              ) : (
                prop.value
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
