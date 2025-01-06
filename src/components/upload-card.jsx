"use client";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import CreateCategory from "@/components/create-category";
import {toast} from "sonner";
import {apiUploadImage} from "@/api/image";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import {apiGetCategories} from "@/api/category";

const schema = z.object({
    image: z.any().refine((file) => file?.size > 0, "请上传图片"),
    category: z.string(),
    shortLink: z.string(),
});


export default function UploadCard() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            category: "",
            shortLink: "",
            image: null,
        },
    });

    const {isAuthenticated} = useAuth();
    const router = useRouter();

    const [categories, setCategories] = useState([]);

    const {data, isError, isLoading} = apiGetCategories()

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const uploadImage = async (data) => {
        try {
            const formData = new FormData();
            formData.append("image", data.image);
            if (data.category && data.category !== "all") {
                formData.append("category", data.category);
            }
            if (data.shortLink) {
                formData.append("shortLink", data.shortLink);
            }
            await apiUploadImage(formData);
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };

    const onSubmit = async (data) => {
        if (!isAuthenticated && isAuthenticated !== null) {
            toast.error("请先登录");
            router.push("/login");
            return;
        }
        await uploadImage(data);
        form.reset();
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">上传图片</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>图片上传</DialogTitle>
                            <DialogDescription>
                                选择分类，填写短链，上传图片
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <FormField
                                name="category"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>分类</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="选择一个分类"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">全部</SelectItem>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.name}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            还没有分类?<CreateCategory/>
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="shortLink"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>短链</FormLabel>
                                        <Input {...field} placeholder="短链"/>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="image"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>图片</FormLabel>
                                        <Input type="file" onChange={(e) => field.onChange(e.target.files[0])}/>
                                        <FormMessage/>
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