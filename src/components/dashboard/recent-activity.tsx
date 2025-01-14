"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

type Activity = {
    id: string
    action: string
    user: string
    time: string
    details: string
}

export function RecentActivity() {
    const [activities, setActivities] = useState<Activity[]>([
        {
            id: "1",
            action: "上传图片",
            user: "用户A",
            time: "2024-03-10 10:30",
            details: "上传了 example.jpg"
        },
        {
            id: "2",
            action: "删除图片",
            user: "用户B",
            time: "2024-03-10 09:45",
            details: "删除了 test.png"
        },
        // 更多示例数据...
    ])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>操作类型</TableHead>
                    <TableHead>操作者</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead>详情</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {activities.map((activity) => (
                    <TableRow key={activity.id}>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>{activity.details}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}