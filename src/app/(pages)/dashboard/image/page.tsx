"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Image } from "@/types/types";
import {fetcher, fetcherPage} from "@/utils/request";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ImagePlus, Filter, Search } from "lucide-react";
import { useState } from "react";
import Loader from "@/components/loader";
import { toast } from "sonner";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex: number, previousPageData: Image[]) => {
    if (previousPageData && !previousPageData.length) return null; // 没有更多数据
    return {url: "/public/images", pageIndex, pageSize: 12}; // POST 的 URL 和页码
};

export default function Page() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    //TODO 优化代码
    const {data,error,size, setSize, isLoading, isValidating,mutate} = useSWRInfinite(
        getKey, ({url, pageIndex, pageSize}) => fetcherPage(url, pageIndex + 1, pageSize), // 使用解构后的 URL 和分页参数
        {
            revalidateFirstPage: false,
        });


    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1); // 重置页码
    };

    const handleFilter = (value: string) => {
        setFilter(value);
        setPage(1);
    };

    const handlePage = (page: number) => {
        setPage(page);
        setSize(page);
    }

    const handleUpload = async () => {
        // 处理上传逻辑
        toast({
            title: "上传成功",
            description: "图片已成功上传到系统"
        });
        mutate(); // 刷新数据
    };

    return (
        <div className="container mx-auto py-6 space-y-6">
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">图片管理</h2>
                    <Button onClick={handleUpload}>
                        <ImagePlus className="mr-2 h-4 w-4" />
                        上传图片
                    </Button>
                </div>

                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="搜索图片..."
                                className="pl-8"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <Select
                        value={filter}
                        onValueChange={handleFilter}
                        items={[
                            { label: "全部", value: "all" },
                            { label: "已使用", value: "used" },
                            { label: "未使用", value: "unused" }
                        ]}
                    />
                </div>

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-center text-red-500 p-4">
                        加载失败,请稍后重试
                    </div>
                ) : (
                    <>
                        <DataTable columns={columns} data={data[page - 1] || []} />
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                总共 {data[page - 1]?.length || 0} 张图片
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => handlePage(page - 1)}
                                    disabled={page === 1}
                                    variant="outline"
                                    size="sm"
                                >
                                    上一页
                                </Button>
                                <span className="text-sm">第 {page} 页</span>
                                <Button
                                    onClick={() => handlePage(page + 1)}
                                    disabled={!data[page - 1]?.length || data[page - 1].length < 12}
                                    variant="outline"
                                    size="sm"
                                >
                                    下一页
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}