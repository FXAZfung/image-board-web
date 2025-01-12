"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Image } from "@/types/types"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BookImage, Link2, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
import { resolveImageUrl } from "@/utils/method"
import ImagePreview from "@/components/image-preview"
import { toast } from "sonner"

/**
 * @description columns - 定义了每一列在表格中的渲染与数据获取
 */
export const columns: ColumnDef<Image>[] = [
    // {
    //     accessorKey: "file_name",
    //     header: () => (<div className="">文件名</div>),
    //     cell: ({ row }) => {
    //         return (
    //             <HoverCard>
    //                 <HoverCardTrigger asChild>
    //                     <Button onClick={()=>{navigator.clipboard.writeText(row.original.file_name)}} size="sm" variant="link">{row.original.file_name}</Button>
    //                 </HoverCardTrigger>
    //                 <HoverCardContent className="z-10 w-fit">
    //                     {row.original.file_name}
    //                 </HoverCardContent>
    //             </HoverCard>
    //         )
    //     }
    // },
    {
        accessorKey: "category",
        header: "分类",
        cell: ({ row }) => {
            return <div>{row.original.category || '全部'}</div>
        }
    },
    {
        accessorKey: "content_type",
        header: "图片类型",
    },
    {
        accessorKey: "width",
        header: "宽度",
    },
    {
        accessorKey: "height",
        header: "高度",
    },
    {
        accessorKey: "image",
        header: "图片",
        cell: ({ row }) => {
            const image = row.original
            return (
                <ImagePreview
                    className="size-20"
                    width={image.width}
                    height={image.height}
                    url={image.file_name}
                    alt={image.file_name}
                />
            )
        }
    },
    {
        accessorKey: "created_at",
        header: "上传时间",
        cell: ({ row }) => {
            return (
                <div>{new Date(row.original.created_at).toLocaleString()}</div>
            )
        }
    },
    {
        id: "actions",
        header: "操作",
        cell: ({ row }) => {
            const image = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>更多操作</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(resolveImageUrl(image.file_name))
                                toast.success("已复制图片链接到剪贴板", { position: "top-center" })
                            }}
                        >
                            复制链接 <Link2 className="ml-2 h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            修改分类 <BookImage className="ml-2 h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            重命名 <SquarePen className="ml-2 h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-destructive">
                            删除 <Trash2 className="ml-2 h-4 w-4" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]