"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type User = {
    id: string
    name: string
    email: string
    role: string
    status: string
    createdAt: string
    avatar: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "avatar",
        header: "",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage src={row.getValue("avatar")} />
                    <AvatarFallback>{row.getValue("name").charAt(0)}</AvatarFallback>
                </Avatar>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    用户名
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: "邮箱",
    },
    {
        accessorKey: "role",
        header: "角色",
    },
    {
        accessorKey: "status",
        header: "状态",
        cell: ({ row }) => {
            return (
                <Badge variant={row.getValue("status") === "Active" ? "default" : "secondary"}>
                    {row.getValue("status")}
                </Badge>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "创建时间",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>编辑用户</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">删除用户</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
