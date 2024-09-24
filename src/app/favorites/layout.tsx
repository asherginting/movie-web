import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorit - Movie Web",
  description: "Your list of favorite movies on Movie Web.",
};

export default function FavoriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
