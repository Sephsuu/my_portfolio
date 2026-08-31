import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Papiverse Playground | Sephsuu",
    description: "An interactive project assistant for exploring Papiverse.",
};

export default function PlaygroundLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
