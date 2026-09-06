import type { Metadata } from "next";
import { ProviderShell } from "@/components/provider/layout/ProviderShell";

export const metadata: Metadata = {
  title: "Provider Portal | Sahayak-Local",
  description:
    "Manage your local service business, active bookings, customers, reviews, and daily earnings on Sahayak-Local.",
};

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProviderShell>{children}</ProviderShell>;
}
