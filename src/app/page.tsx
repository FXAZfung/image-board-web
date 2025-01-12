"use client";
import {useEffect} from "react";
import Intro from "@/components/intro";
import UploadCard from "@/components/upload-card";
import {Button} from "@/components/ui/button";
import {useSetting} from "@/context/setting-context";
import {toast} from "sonner";
import Link from 'next/link';

export default function Index() {
    const {setting} = useSetting();

    useEffect(() => {
        const toastId = toast(
            <div className="announcement" dangerouslySetInnerHTML={{__html: setting?.announcement}}></div>,
            {
                duration: 3000,
                position: "top-left",
            }
        );
        return () => toast.dismiss(toastId);
    }, [setting]);

    if (!setting) {
        return null;
    }

    return (
        <div className="w-full min-h-screen container">
            <Intro/>
            <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
                <div className="text-3xl font-bold">{setting.index_title}</div>
                <div className="">{setting.index_description}</div>
                <div className="flex items-center justify-center gap-4">
                    <UploadCard/>
                    <Button asChild>
                        <Link href="/exhibition">立即进入</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}