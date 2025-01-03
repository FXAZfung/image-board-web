"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    category: z.string().nonempty("请选择一个分类"),
    shortLink: z.string().nonempty("请填写短链"),
    image: z.any().refine((file) => file?.size > 0, "请上传图片"),
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

    const onSubmit = (data) => {
        console.log(data);
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
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>分类</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="选择一个分类" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">全部</SelectItem>
                                                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                                <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                                <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            还没有分类?<Button variant="link">去创建一个分类</Button>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="shortLink"
                                control={form.control}
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
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>图片</FormLabel>
                                        <Input type="file" onChange={(e) => field.onChange(e.target.files[0])} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">上传</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}