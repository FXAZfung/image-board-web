"use client";
import {useEffect} from "react";
import {apiSaveSetting} from "@/api/setting";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useSetting} from "@/context/setting-context";
import {toast} from "sonner";
import {Setting, SettingRequest} from "@/types/types";

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

export default function Page() {
    const {setting} = useSetting()

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            site_title: "",
            announcement: "",
            logo: "",
            favicon: "",
            default_page_size: 20,
            robots_txt: "",
            index_title: "",
            index_description: "",
        },
    });

    useEffect(() => {
        form.reset(setting)
    }, [setting, form]);

    const saveSetting = async (formData:Setting) => {
        try {
            await apiSaveSetting(resolveSetting(formData));
            toast.success('保存成功');
        } catch (err) {
            console.error(err);
        }
    }

    const resolveSetting = (setting:Setting):SettingRequest[] => {
        return Object.entries(setting).map(([key, value]) => {
            return {key, value};
        });
    }

    const onSubmit = async (formData:Setting) => {
        await saveSetting(formData);
    };

    return (
        <div className="p-8 w-full h-full">
            <div className="flex items-start">
                <h1 className="text-2xl font-bold">站点设置</h1>
                <Badge variant="outline" className="font-bold">{setting?.version}</Badge>
            </div>
            <Form {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <FormField
                            name="site_title"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>站点名称</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="announcement"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>站点描述</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="index_title"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>首页标题</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="index_description"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>首页描述</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="logo"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>站点 Logo</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="favicon"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>站点 Favicon</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="default_page_size"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>默认分页大小</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="robots_txt"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>robots.txt</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </div>
                    <div>
                        <Button type="submit">保存</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}