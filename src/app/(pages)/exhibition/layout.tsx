import Navbar from "@/components/navbar";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background p-4 md:p-10 md:pt-8">
            {/* Navbar remains sticky, which can be beneficial for always-visible navigation */}
            <Navbar />
            <section className="flex-1 mt-4">{children}</section>
        </div>
    );
}