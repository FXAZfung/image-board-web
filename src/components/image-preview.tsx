"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Link, RotateCw, Shrink} from "lucide-react";
import {toast} from "sonner";
import {cn} from "@/lib/utils";

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
    const [dragOffset, setDragOffset] = useState({x: 0, y: 0});
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
        null
    );

    useEffect(() => {
        const handleDrag = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (dragStart) {
                setDragOffset((prev) => ({
                    x: prev.x + (e.clientX - dragStart.x),
                    y: prev.y + (e.clientY - dragStart.y),
                }));
                setDragStart({x: e.clientX, y: e.clientY});
            }
        };

        const handleDragEnd = () => {
            setDragStart(null);
        };

        if (dragStart) {
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", handleDragEnd);
        }

        return () => {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", handleDragEnd);
        };
    }, [dragStart]);

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
        setDragOffset({x: 0, y: 0});
    };

    const resolveImage = (url: string) => {
        return `http://localhost:4536/images/image/${url}`;
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

    const copyMarkdown = () => {
        navigator.clipboard.writeText(`![${alt}](${resolveImage(url)})`);
        toast.success("Markdown 已复制", {
            duration: 1000,
            position: "top-left",
        });
    }

    const copyBBCode = () => {
        navigator.clipboard.writeText(`[img]${resolveImage(url)}[/img]`);
        toast.success("BBCode 已复制", {
            duration: 1000,
            position: "top-left",
        });
    }

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragStart({x: e.clientX, y: e.clientY});
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
                    className={cn(
                        "rounded p-1 transition-all duration-200 hover:opacity-80",
                        className
                    )}
                />
            </div>

            {/* 预览弹窗 */}
            {isPreviewVisible && (
                <div
                    className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onWheel={handleWheel}
                >
                    {isLoading && (
                        <div
                            className="absolute w-10 h-10 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                    )}
                    <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={closePreview}
                    />
                    <div
                        className="relative cursor-grab"
                        style={{
                            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(${scale}) rotate(${rotate}deg)`,
                            transformOrigin: "center center",
                            transition: "transform 0.2s linear, opacity 0.3s ease-in-out",
                            opacity: isImageLoaded ? 1 : 0.2,
                        }}
                        onMouseDown={handleDragStart}
                    >
                        <Image
                            src={resolveImage(url)}
                            alt={alt}
                            width={width}
                            height={height}
                            quality={100}
                            className="rounded shadow dark:shadow-none dark:border dark:border-gray-700"
                            onLoadingComplete={() => {
                                setIsLoading(false);
                                setIsImageLoaded(true);
                            }}
                        />
                    </div>

                    {/* 操作按钮组 */}
                    <div className="absolute gap-1 top-4 right-4 flex flex-col">
                        <Button
                            onClick={handleRotate}
                            size="icon"
                            variant="ghost"
                            className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800"
                        >
                            <RotateCw/>
                        </Button>
                        <Button
                            onClick={closePreview}
                            size="icon"
                            variant="ghost"
                            className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800"
                        >
                            <Shrink/>
                        </Button>
                        <Button
                            onClick={copyLink}
                            size="icon"
                            variant="ghost"
                            className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800"
                        >
                            <Link/>
                        </Button>
                        <Button onClick={copyMarkdown}
                                size="icon"
                                variant="ghost"
                                className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 640 512">
                                <path
                                    d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"/>
                            </svg>
                        </Button>
                        <Button onClick={copyBBCode}
                                size="icon"
                                variant="ghost"
                                className="z-50 shadow-lg rounded-full size-12 bg-white dark:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 320 512">
                                <path
                                    d="M64 32C28.7 32 0 60.7 0 96L0 256 0 416c0 35.3 28.7 64 64 64l128 0c70.7 0 128-57.3 128-128c0-46.5-24.8-87.3-62-109.7c18.7-22.3 30-51 30-82.3c0-70.7-57.3-128-128-128L64 32zm96 192l-96 0L64 96l96 0c35.3 0 64 28.7 64 64s-28.7 64-64 64zM64 288l96 0 32 0c35.3 0 64 28.7 64 64s-28.7 64-64 64L64 416l0-128z"/>
                            </svg>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
