"use client";
import React, { useState } from "react";
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
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CreateCategory from "@/components/create-category";
import { apiUploadImage } from "@/api/image";
import { apiGetCategories } from "@/api/category";
import { useAuth } from "@/context/auth-context";
import { ImageRequest } from "@/types/types";
import { resolveImageUrl } from "@/utils/method";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const uploadSchema = z.object({
    image: z.custom<File>()
        .refine(file => file?.size > 0, "请选择文件")
        .refine(file => file?.size <= MAX_FILE_SIZE, "文件大小不能超过20MB"),
    category: z.string().optional(),
    shortLink: z.string().optional(),
});

export default function UploadCard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const [previewUrl, setPreviewUrl] = useState<string>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [uploadResult, setUploadResult] = useState<{
        imageUrl: string;
        markdownLink: string;
        bbcodeLink: string;
    } | null>(null);

    const {
        data: categoriesData,
        isLoading: isCategoriesLoading,
        isError: categoriesError,
    } = apiGetCategories();
    const categories = categoriesData ?? [];

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
            if (uploadData.image) {
                formData.append("image", uploadData.image);
            }
            if (uploadData.category && uploadData.category !== "all") {
                formData.append("category", uploadData.category);
            }
            if (uploadData.shortLink) {
                formData.append("short_link", uploadData.shortLink);
            }

            const response = await apiUploadImage(formData);
            reset(); // 重置表单
            setIsDialogOpen(false);

            const imageUrl = resolveImageUrl(response.path);
            const markdownLink = `![图片](${imageUrl})`;
            const bbcodeLink = `[img]${imageUrl}[/img]`;

            setUploadResult({ imageUrl, markdownLink, bbcodeLink });
            return { imageUrl, markdownLink, bbcodeLink };
        } catch (error) {
            console.error(error);
            toast.error("上传失败，请检查网络或重试");
            return null;
        }
    };

    const onSubmit = async (data: ImageRequest) => {
        if (!isAuthenticated) {
            toast.error("请先登录");
            router.push("/login");
            return;
        }

        const result = await uploadImage(data);
        if (result) {
            toast.success("上传成功", {
                action: {
                    label: "复制链接",
                    onClick: () => {
                        setShowAlertDialog(true); // 显示 AlertDialog
                    },
                },
            });
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                {/* 表单字段 */}
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
                                                    {isCategoriesLoading ? (
                                                        <div className="p-2 text-sm">加载分类中...</div>
                                                    ) : categoriesError ? (
                                                        <div className="p-2 text-sm text-red-500">加载失败</div>
                                                    ) : (
                                                        <>
                                                            <SelectItem value="all">全部</SelectItem>
                                                            {categories?.map((category) => (
                                                                <SelectItem key={category.id} value={category.name}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </>
                                                    )}
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
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                        setPreviewUrl(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                            {previewUrl && (
                                                <img
                                                    src={previewUrl}
                                                    alt="预览"
                                                    className="mt-2 max-h-40 object-contain"
                                                />
                                            )}
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
            {/* 上传成功后渲染复制链接的 UI */}
            {uploadResult && (
                <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>选择要复制的链接类型</AlertDialogTitle>
                            <AlertDialogDescription>
                                请选择以下链接类型之一进行复制：
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(uploadResult.imageUrl);
                                    toast.success("图片链接已复制");
                                    setShowAlertDialog(false); // 关闭 AlertDialog
                                }}
                            >
                                复制图片链接
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(uploadResult.markdownLink);
                                    toast.success("Markdown 链接已复制");
                                    setShowAlertDialog(false); // 关闭 AlertDialog
                                }}
                            >
                                复制 Markdown 链接
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(uploadResult.bbcodeLink);
                                    toast.success("BBcode 链接已复制");
                                    setShowAlertDialog(false); // 关闭 AlertDialog
                                }}
                            >
                                复制 BBcode 链接
                            </Button>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>
                                关闭
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}