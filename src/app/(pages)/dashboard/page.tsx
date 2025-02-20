"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Overview} from "@/components/dashboard/overview"
import {RecentActivity} from "@/components/dashboard/recent-activity"
import {ImageUploads} from "@/components/dashboard/image-uploads"
import {DashboardHeader} from "@/components/dashboard/header"
import {ScrollArea} from "@/components/ui/scroll-area"
import {apiInfo} from "@/api/info";
import Loader from "@/components/loader";
import {formatMemory} from "@/utils/method";

export default function DashboardPage() {
    const {data: info, isLoading} = apiInfo();

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <DashboardHeader/>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">总图片数</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{info?.image_count}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">分类数量</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{info?.category_count}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">存储用量</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatMemory(info?.storage_usage as number)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{info?.user_count}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>数据概览</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview/>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>最近上传</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            <ImageUploads/>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>最近活动</CardTitle>
                </CardHeader>
                <CardContent>
                    <RecentActivity/>
                </CardContent>
            </Card>
        </div>
    )
}