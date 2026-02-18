export type NavItem = {
  label: string;
  href: string;
  icon: "dashboard" | "transactions" | "customers" | "settlements" | "disputes" | "settings" | "api-keys";
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Transactions", href: "/dashboard/transactions", icon: "transactions" },
  { label: "Customers", href: "/dashboard/customers", icon: "customers" },
  { label: "Settlements", href: "/dashboard/settlements", icon: "settlements" },
  { label: "Disputes", href: "/dashboard/disputes", icon: "disputes" },
];

export const NAV_FOOTER_ITEMS: NavItem[] = [
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
  { label: "API Keys", href: "/dashboard/api-keys", icon: "api-keys" },
];

/** Items shown in bottom nav (mobile) - subset */
export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Transactions", href: "/dashboard/transactions", icon: "transactions" },
  { label: "Customers", href: "/dashboard/customers", icon: "customers" },
  { label: "Settlements", href: "/dashboard/settlements", icon: "settlements" },
];
