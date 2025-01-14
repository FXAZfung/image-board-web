"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link, RotateCw, Shrink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
    url: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
    className?: string;
}

export default function ImagePreview({
                                         url = "",
                                         alt = "image",
                                         width = 300,
                                         height = 200,
                                         blurDataURL = "",
                                         className,
                                     }: ImagePreviewProps) {
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const openPreview = () => {
        setIsPreviewVisible(true);
        setIsLoading(true);
        setIsImageLoaded(false);
        document.body.style.overflow = "hidden";
    };

    const closePreview = () => {
        setIsPreviewVisible(false);
        document.body.style.overflow = "auto";
        setScale(1);
        setRotate(0);
    };

    const resolveImage = (url: string) => {
        return `http://localhost:4536/api/public/images/${url}`;
    };

    const handleWheel = (e: any) => {
        e.preventDefault();
        const zoomStep = 0.1;
        if (e.deltaY < 0) {
            setScale((prev) => prev + zoomStep);
        } else {
            setScale((prev) => Math.max(prev - zoomStep, 0.2));
        }
    };

    const handleRotate = () => {
        setRotate((prev) => (prev + 90) % 360);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(resolveImage(url));
        toast.success("图片链接已复制", {
            duration: 1000,
            position: "top-left",
        });
    };

    return (
        <>
            {/* 缩略图 */}
            <div className="cursor-pointer inline-block" onClick={openPreview}>
                <Image
                    src={resolveImage(url)}
                    alt={alt}
                    width={width}
                    height={height}
                    placeholder={blurDataURL ? "blur" : "empty"}
                    blurDataURL={blurDataURL}
                    quality={5}
                    className={cn("rounded p-1 transition-all duration-200 hover:opacity-80", className)}
                />
            </div>

            {/* 预览弹窗 */}
            {isPreviewVisible && (
                <div
                    className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onWheel={handleWheel}
                >
                    {isLoading && (
                        <div className="absolute w-10 h-10 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                    )}
                    <div className="absolute inset-0 cursor-pointer" onClick={closePreview} />
                    <Image
                        src={resolveImage(url)}
                        alt={alt}
                        width={width}
                        height={height}
                        quality={100}
                        style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                            transformOrigin: "center center",
                            transition: "transform 0.2s linear, opacity 0.3s ease-in-out",
                            opacity: isImageLoaded ? 1 : 0.2,
                        }}
                        className="rounded shadow dark:shadow-none dark:border dark:border-gray-700"
                        onLoadingComplete={() => {
                            setIsLoading(false);
                            setIsImageLoaded(true);
                        }}
                    />

                    {/* 操作按钮组 */}
                    <div className="absolute gap-1 top-4 right-4 flex flex-col">
                        <Button
                            onClick={handleRotate}
                            size="icon"
                            variant="ghost"
                            className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800"
                        >
                            <RotateCw />
                        </Button>
                        <Button
                            onClick={closePreview}
                            size="icon"
                            variant="ghost"
                            className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800"
                        >
                            <Shrink />
                        </Button>
                        <Button
                            onClick={copyLink}
                            size="icon"
                            variant="ghost"
                            className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800"
                        >
                            <Link />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}