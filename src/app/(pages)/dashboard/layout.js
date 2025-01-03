"use client";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {useAuth} from "@/context/auth-context"
import {useRouter} from "next/navigation"
import {useEffect} from "react";
import {toast} from "sonner";


export default function DashBoardLayout({children}) {

    const {isAuthenticated} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && isAuthenticated !== null) {
            router.push("/login");
        }
    }, [])

    if (!isAuthenticated) {
        return null;
    }

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">首页</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">控制台</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}