import { Metadata } from "next";
import Layout from "@/layout/layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Sistema administrativo",
  description:
    "Sistema para la administración.",
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: "device-width" },
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <Layout>{children}</Layout>;
}
