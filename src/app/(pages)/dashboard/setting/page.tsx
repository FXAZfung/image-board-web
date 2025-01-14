"use client";
import { useEffect, useState } from "react";
import { apiSaveSetting } from "@/api/setting";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSetting } from "@/context/setting-context";
import { toast } from "sonner";
import { Setting, SettingRequest } from "@/types/types";

// 表单校验规则
const schema = z.object({
    site_title: z.string().nonempty("站点名称不能为空"),
    announcement: z.string().nonempty("站点描述不能为空"),
    logo: z.string().nonempty("站点 Logo 不能为空"),
    favicon: z.string().nonempty("站点 Favicon 不能为空"),
    default_page_size: z.string().nonempty("默认分页大小不能为空"),
    robots_txt: z.string().nonempty("robots.txt 不能为空"),
    index_title: z.string().nonempty("首页标题不能为空"),
    index_description: z.string().nonempty("首页描述不能为空"),
});


// 抽离表单字段组件
const FormFieldInput = ({ name, label, control }: { name: string; label: string; control: any }) => (
    <FormField
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
            </FormItem>
        )}
    />
);

export default function Page() {
    const { setting } = useSetting();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            site_title: "",
            announcement: "",
            logo: "",
            favicon: "",
            default_page_size: "20", // 默认值为字符串，与 schema 一致
            robots_txt: "",
            index_title: "",
            index_description: "",
        },
    });

    // 当 setting 数据加载完成后，重置表单值
    useEffect(() => {
        if (setting) {
            form.reset({
                ...setting,
                default_page_size: setting.default_page_size?.toString(), // 确保类型一致
            });
        }
    }, [setting, form]);

    // 解析 Setting 为 SettingRequest[]
    const resolveSetting = (setting: Setting): SettingRequest[] => {
        return Object.entries(setting).map(([key, value]) => ({ key, value }));
    };

    // 保存设置
    const saveSetting = async (formData: Setting) => {
        try {
            setIsSubmitting(true);
            await apiSaveSetting(resolveSetting(formData));
            toast.success("保存成功");
        } catch (err) {
            console.error(err);
            toast.error("保存失败，请重试");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 表单提交
    const onSubmit = async (formData:Setting) => {
        await saveSetting(formData);
    };

    return (
        <div className="p-8 w-full h-full">
            <div className="flex items-start gap-2 mb-6">
                <h1 className="text-2xl font-bold">站点设置</h1>
                <Badge variant="outline" className="font-bold">
                    {setting?.version}
                </Badge>
            </div>
            <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <FormFieldInput name="site_title" label="站点名称" control={form.control} />
                        <FormFieldInput name="announcement" label="站点描述" control={form.control} />
                        <FormFieldInput name="index_title" label="首页标题" control={form.control} />
                        <FormFieldInput name="index_description" label="首页描述" control={form.control} />
                        <FormFieldInput name="logo" label="站点 Logo" control={form.control} />
                        <FormFieldInput name="favicon" label="站点 Favicon" control={form.control} />
                        <FormFieldInput name="default_page_size" label="默认分页大小" control={form.control} />
                        <FormFieldInput name="robots_txt" label="robots.txt" control={form.control} />
                    </div>
                    <div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "保存中..." : "保存"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}