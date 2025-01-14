"use client";
import { useEffect, useState } from "react";
import { apiGetCategories } from "@/api/category";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {Category} from "@/types/types";

export default function Page() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // 搜索关键词
    const { data, isLoading } = apiGetCategories();

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    // 过滤分类数据
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 删除分类
    const handleDeleteCategory = (id:number) => {
        setCategories(categories.filter((category) => category.id !== id));
        toast.success("分类删除成功");
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-8 w-full h-full">
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="搜索分类"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Button onClick={() => toast("添加分类功能待实现")}>添加分类</Button>
            </div>
            <Table>
                <TableCaption>分类列表</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>名字</TableHead>
                        <TableHead>随机</TableHead>
                        <TableHead>公开</TableHead>
                        <TableHead>操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCategories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.is_random ? "√" : "×"}</TableCell>
                            <TableCell>{category.is_public ? "√" : "×"}</TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    删除
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toast("编辑分类功能待实现")}
                                >
                                    编辑
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}