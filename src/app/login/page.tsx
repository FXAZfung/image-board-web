"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * @description 定义登录表单的数据结构和验证规则
 */
const schema = z.object({
    username: z.string().nonempty("用户名不能为空"),
    password: z.string().nonempty("密码不能为空"),
    remember: z.boolean().optional(),
});

interface LoginData {
    username: string;
    password: string;
    remember: boolean;
}

/**
 * @description Home - 登录页面，使用 Tailwind CSS 自定义变量进行深色和浅色模式适配
 */
export default function Home() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // 使用 Zod + React Hook Form 做表单验证
    const form = useForm<LoginData>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: "",
            password: "",
            remember: false,
        },
    });

    // 提交事件处理
    const onSubmit = async (data: LoginData) => {
        try {
            setLoading(true);
            await login(data.username, data.password, data.remember);
            toast.success("登录成功");
            router.push("/dashboard");
        } catch (error) {
            toast.error(String(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute -z-10 h-80 w-80 rounded-full bg-primary/20 -top-20 -right-20 blur-3xl" />
            <div className="absolute -z-10 h-60 w-60 rounded-full bg-primary/20 -bottom-10 -left-10 blur-3xl" />

            {/* 主要内容 */}
            <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                {/* 左侧介绍区域 */}
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        私人图床
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                "这是一个安全、高效、易用的私人图床系统，让您的图片管理更加轻松自如。"
                            </p>
                            <footer className="text-sm">Powered by Gin & Next.js</footer>
                        </blockquote>
                    </div>
                </div>

                {/* 右侧登录表单 */}
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                欢迎回来
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                请输入您的账号信息以继续访问
                            </p>
                        </div>

                        <Card className="border-none shadow-none">
                            <CardContent className="p-0">
                                <Form {...form}>
                                    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            name="username"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>用户名</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="请输入用户名"
                                                            disabled={loading}
                                                            className="bg-background"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            name="password"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>密码</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="请输入密码"
                                                            disabled={loading}
                                                            className="bg-background"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex items-center justify-between">
                                            <FormField
                                                name="remember"
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center space-x-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                                disabled={loading}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            记住我
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                            <Button variant="link" className="text-sm px-0" asChild>
                                                <Link href="#">忘记密码？</Link>
                                            </Button>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={loading}
                                        >
                                            {loading ? "登录中..." : "登录"}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>

                        <Button
                            variant="outline"
                            className="w-full"
                            asChild
                            disabled={loading}
                        >
                            <Link href="/">返回首页</Link>
                        </Button>

                        <p className="px-8 text-center text-sm text-muted-foreground">
                            通过登录，即表示您同意我们的{" "}
                            <Link
                                href="#"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                服务条款
                            </Link>
                            {" "}和{" "}
                            <Link
                                href="#"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                隐私政策
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}