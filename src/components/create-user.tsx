import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Category, ImageRequest} from "@/types/types";
import CreateCategory from "@/components/create-category";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/auth-context";
import {apiGetCategories} from "@/api/category";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {apiUploadImage} from "@/api/image";
import {toast} from "sonner";


const uploadSchema = z.object({

});

export default function CreateUser() {

    // 初始化 react-hook-form
    const form = useForm<ImageRequest>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {

        },
    });

    const { handleSubmit, reset, control } = form;

    const uploadImage = async (uploadData: ImageRequest) => {

    };

    const onSubmit = async (data: ImageRequest) => {

    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    新建用户
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>创建一个新用户</DialogTitle>
                            <DialogDescription>
                                请填写以下信息以创建一个新用户
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">

                        </div>

                        <DialogFooter className="mt-2">
                            <Button type="submit">创建</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}