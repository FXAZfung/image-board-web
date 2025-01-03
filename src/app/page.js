
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Intro from "@/components/intro";
import Navbar from "@/components/navbar";

import UploadCard from "@/components/upload-card";


export default async function Index() {
    return (
        <div className="w-full min-h-screen">
            <Intro />
            <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
                <div className="text-3xl font-bold">在这里上传和分享你的图片</div>
                <div className="flex items-center justify-center gap-5">
                    <UploadCard />
                    <Button asChild>
                        <Link href="/exhibition">
                            立即进入
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
