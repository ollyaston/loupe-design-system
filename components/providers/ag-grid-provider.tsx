"use client";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";

const AG_GRID_LICENSE_KEY = process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY;

if (AG_GRID_LICENSE_KEY) {
  LicenseManager.setLicenseKey(AG_GRID_LICENSE_KEY);
}

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

export function AgGridProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
