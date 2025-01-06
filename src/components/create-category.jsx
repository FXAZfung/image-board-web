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
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Checkbox,} from "@/components/ui/checkbox"
import {apiCreateCategory} from "@/api/category";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/auth-context";


const schema = z.object({
    name: z.string().nonempty("分类名不能为空"),
    is_public: z.boolean().optional(),
    is_random: z.boolean().optional(),
});


export default function CreateCategory() {

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            is_public: true,
            is_random: true,
        },
    });

    const router = useRouter();
    const {isAuthenticated} = useAuth();

    const CreateCategory = (data) => {
        apiCreateCategory(data).then(() => {
            toast.success("创建成功");
        }).catch((err) => {
            console.log(err);
            toast.error(err);
        })
    }

    const onSubmit = async (data) => {
        if (!isAuthenticated) {
            toast.error("请先登录");
            router.push("/login");
            return;
        }
        await CreateCategory(data);
        form.reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">
                    创建分类
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader className="mb-4">
                            <DialogTitle className="mb-2">创建分类</DialogTitle>
                            <DialogDescription>
                                支持中文，会在你的本机创建一个文件夹分类
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <Input {...field} placeholder="填写分类名"/>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="is_public"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormLabel>是否公开</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="is_random"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormLabel>是否随机</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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