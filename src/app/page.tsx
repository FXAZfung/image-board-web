"use client";
import { useEffect } from "react";
import Intro from "@/components/intro";
import UploadCard from "@/components/upload-card";
import { Button } from "@/components/ui/button";
import { useSetting } from "@/context/setting-context";
import { toast } from "sonner";
import Link from "next/link";
import Loader from "@/components/loader";

// 抽离 AnnouncementToast 组件
const AnnouncementToast = ({ announcement }: { announcement: string }) => {
    return (
        <div
            className="announcement"
            dangerouslySetInnerHTML={{ __html: announcement }}
        />
    );
};

// 抽离 MainContent 组件
const MainContent = ({ setting }: { setting: any }) => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
            <div className="text-3xl font-bold">{setting.index_title}</div>
            <div className="text-center">{setting.index_description}</div>
            <div className="flex items-center justify-center gap-4">
                <UploadCard />
                <Button asChild>
                    <Link href="/exhibition">立即进入</Link>
                </Button>
            </div>
        </div>
    );
};

export default function Index() {
    const { setting } = useSetting();

    // 只在 setting.announcement 变化时显示 toast
    useEffect(() => {
        if (setting?.announcement) {
            const toastId = toast(
                <AnnouncementToast announcement={setting.announcement} />,
                {
                    duration: 3000,
                    position: "top-left",
                }
            );
            return () => toast.dismiss(toastId);
        }
    }, [setting?.announcement]);

    // 如果 setting 未加载完成，显示加载状态
    if (!setting) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="w-full min-h-screen container">
            <Intro />
            <MainContent setting={setting} />
        </div>
    );
}