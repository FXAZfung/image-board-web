"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CreateCategory from "@/components/create-category";
import { apiUploadImage } from "@/api/image";
import { apiGetCategories } from "@/api/category";
import { useAuth } from "@/context/auth-context";
import { Category, ImageRequest } from "@/types/types";
import {PlusCircle} from "lucide-react";

/*
  1. 将表单验证的 schema 抽离到组件外部，保持代码简洁。
  2. 合理使用 React Hook Form，避免多余状态同步。
  3. 在获取 categories 时，可以直接使用 data ?? [] 替代额外的 useEffect 同步。
*/
const uploadSchema = z.object({
    image: z.custom<File>((val) => val instanceof File && val.size > 0, {
        message: "请上传图片",
    }),
    category: z.string().optional(),
    shortLink: z.string().optional(),
});

export default function UploadCard({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    // 从自定义 Hook 获取分类数据（后端返回数组或其他内容）
    const { data: categoriesData, isLoading } = apiGetCategories();
    const categories = categoriesData ?? [];

    // 初始化 react-hook-form
    const form = useForm<ImageRequest>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {
            category: "",
            shortLink: "",
            image: undefined,
        },
    });

    const { handleSubmit, reset, control } = form;

    const uploadImage = async (uploadData: ImageRequest) => {
        try {
            const formData = new FormData();
            // 追加图片文件
            if (uploadData.image) {
                formData.append("image", uploadData.image);
            }
            // 追加分类
            if (uploadData.category && uploadData.category !== "all") {
                formData.append("category", uploadData.category);
            }
            // 追加短链
            if (uploadData.shortLink) {
                formData.append("short_link", uploadData.shortLink);
            }
            const response = await apiUploadImage(formData);
            toast.success("上传成功, 短链: " + response);
        } catch (error) {
            console.error(error);
            toast.error("上传失败，请检查网络或重试");
        }
    };

    const onSubmit = async (data: ImageRequest) => {
        if (!isAuthenticated) {
            toast.error("请先登录");
            router.push("/login");
            return;
        }
        await uploadImage(data);
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>图片上传</DialogTitle>
                            <DialogDescription>
                                选择分类，填写短链，上传图片
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <FormField
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>分类</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="选择一个分类" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">全部</SelectItem>
                                                {categories?.map((category: Category) => (
                                                    <SelectItem key={category.id} value={category.name}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            还没有分类? <CreateCategory />
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="shortLink"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>短链</FormLabel>
                                        <Input {...field} placeholder="短链" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>图片</FormLabel>
                                        <Input
                                            type="file"
                                            // 通过 onChange 将 File 对象传递给 RHF
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    field.onChange(e.target.files[0]);
                                                }
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="mt-2">
                            <Button type="submit">上传</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}