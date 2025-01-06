'use client';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {toast} from "sonner"
import Link from 'next/link';
import Intro from '@/components/intro';
import {useAuth} from "@/context/auth-context";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";

const schema = z.object({
    username: z.string().nonempty("用户名不能为空"),
    password: z.string().nonempty("密码不能为空"),
    remember: z.boolean().optional(),
});

export default function Home() {
    const {login} = useAuth();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            username: '',
            password: '',
            remember: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            await login(data.username, data.password, data.remember);
            toast.success('登录成功');
            router.push("/dashboard");
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <div className="w-full ">
            <Intro/>
            <div className="w-full min-h-screen flex items-center justify-center flex-col">
                <div className="flex items-center justify-center">
                    <Card className="min-w-80">
                        <CardHeader>
                            <CardTitle>登录到您的图床</CardTitle>
                            <CardDescription>使用 Gin | Next 构建的私人图床</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        name="username"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="用户名" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="password"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="password" placeholder="密码" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center justify-between">
                                        <FormField
                                            name="remember"
                                            control={form.control}
                                            render={({field}) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormLabel>记住我</FormLabel>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <Button asChild variant="link">
                                            <Link href="#">忘记密码</Link>
                                        </Button>
                                    </div>
                                    <Button type="submit" className="w-full">登录</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex items-center justify-center">
                            <Button className="w-full" variant="outline" asChild>
                                <Link href="/">返回首页</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}