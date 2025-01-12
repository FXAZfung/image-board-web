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
import Intro from "@/components/intro";
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
        /*
          主容器使用 Tailwind CSS 的全局变量：
          - bg-background / text-foreground 分别匹配浅色和深色的背景前景色
          - min-h-screen & flex 帮助全屏居中布局
        */
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
            {/* 介绍或头部位置，可根据需要自行调整 */}
            <Intro />

            {/* flex-grow 保证卡片居中，py-10 & px-4 提供额外空白边距 */}
            <div className="flex-grow flex items-center justify-center py-10 px-4">
                {/* Card 使用 bg-card / text-card-foreground 来应用卡片的前后景色 */}
                <Card className="w-full max-w-sm bg-card text-card-foreground border border-border shadow-sm rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">登录到您的图床</CardTitle>
                        <CardDescription className="text-sm">
                            使用 Gin | Next 构建的私人图床
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                                {/* 用户名输入 */}
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">用户名</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="请输入用户名"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* 密码输入 */}
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">密码</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="请输入密码"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* 记住我 + 忘记密码 */}
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
                                                <FormLabel className="text-sm">记住我</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <Button asChild variant="link" className="text-sm">
                                        <Link href="#">忘记密码？</Link>
                                    </Button>
                                </div>

                                {/* 登录按钮 */}
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
                    <CardFooter className="flex items-center justify-center">
                        {/* 返回首页按钮 */}
                        <Button
                            className="w-full"
                            variant="outline"
                            asChild
                            disabled={loading}
                        >
                            <Link href="/">返回首页</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}