"use client";
import {ColumnDef} from "@tanstack/react-table";
import {Image} from "@/types/types";
import {Button} from "@/components/ui/button";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Copy, Eye, Trash2} from "lucide-react";
import ImageComponent from "next/image";
import {resolveImageUrl} from "@/utils/method";
import ImagePreview from "@/components/image-preview";
import {toast} from "sonner";

export const columns: ColumnDef<Image>[] = [
    {
        accessorKey: "preview",
        header: "预览",
        cell: ({row}) => {
            const img = row.original;
            return (
                <HoverCard>
                    <HoverCardTrigger>
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <ImageComponent
                                src={resolveImageUrl(img.file_name)}
                                alt={img.file_name}
                                fill
                                className="object-cover"
                                quality={5}
                            />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="relative w-full h-40">
                            <ImageComponent
                                src={resolveImageUrl(img.file_name)}
                                alt={img.file_name}
                                quality={5}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </HoverCardContent>
                </HoverCard>
            );
        },
    },
    {
        accessorKey: "category",
        header: "分类",
        cell: ({row}) => (
            <div>
                {row.original.category || "全部"}
            </div>
        ),
    },
    {
        accessorKey: "content_type",
        header: "图片类型",
        cell: ({row}) => (
            <div>
                {row.original.content_type}
            </div>
        ),
    },
    {
        accessorKey: "width",
        header: "宽度",
        cell: ({row}) => (
            <div>{row.original.width}</div>
        ),
    },
    {
        accessorKey: "height",
        header: "高度",
        cell: ({row}) => (
            <div>{row.original.height}</div>
        ),
    },
    {
        accessorKey: "image",
        header: "图片",
        cell: ({row}) => {
            const image = row.original;
            return (
                <ImagePreview
                    className="size-20 rounded-md object-cover"
                    width={image.width}
                    height={image.height}
                    url={image.file_name}
                    alt={image.file_name}
                />
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "上传时间",
        cell: ({row}) => (
            <div>
                {new Date(row.original.created_at).toLocaleString()}
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({row}) => {
            const img = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            toast.success("已复制链接到剪切板");
                            navigator.clipboard.writeText(resolveImageUrl(img.file_name))
                        }
                        }
                    >
                        <Copy className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(resolveImageUrl(img.file_name), '_blank')}
                    >
                        <Eye className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {/* 处理删除 */
                        }}
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            );
        },
    },
];