"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ToggleTheme from "@/components/toggle-theme";
import { Loader2 } from "lucide-react";
import Loader from "@/components/loader";

// 抽离头部组件
const DashboardHeader = () => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-8 justify-between">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">首页</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/exhibition">展览</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">控制台</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <ToggleTheme />
        </header>
    );
};

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // 检查认证状态
    useEffect(() => {
        if (isAuthenticated === false) {
            router.push("/login");
        } else if (isAuthenticated === true) {
            setIsLoading(false);
        }
    }, [isAuthenticated, router]);

    // 如果未认证且正在加载，显示加载状态
    if (isLoading || !isAuthenticated) {
        return (
            <Loader/>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}