import {Calendar, Home, Inbox, Search, Settings, User} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import Link from "next/link"

// Menu items.
const items = [
    // {
    //     title: "首页",
    //     url: "/",
    //     icon: Home,
    // },
    {
        title: "控制台",
        url: "/dashboard/",
        icon: Inbox,
    },
    // {
    //     title: "展览",
    //     url: "/exhibition",
    //     icon: Search,
    // },

    {
        title: "设置",
        url: "/dashboard/setting",
        icon: Settings,
    },
    {
        title:"用户",
        url:"/dashboard/user",
        icon:User,
    },
    {
        title:"图片",
        url:"/dashboard/image",
        icon:Calendar,
    },
    {
        title:"分类",
        url:"/dashboard/category",
        icon:Search,
    },
    
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <img
                            width={40}
                            height={40}
                            alt="apple-touch-icon"
                            src={"/apple-touch-icon.png"}
                            className="relative border-2 border-transparent h-10 w-10 object-cover object-top block dark:hidden "
                        />
                        <img
                            width={40}
                            height={40}
                            alt="apple-touch-icon"
                            src={"/apple-touch-icon-dark.png"}
                            className="relative border-2 border-transparent h-10 w-10 object-cover object-top hidden dark:block "
                        />
                        <div className="flex flex-col justify-center items-start">
                            <span className="text-sm font-bold">IM 图床</span>
                            <span className="text-xs text-primary">1.0.0</span>
                        </div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}