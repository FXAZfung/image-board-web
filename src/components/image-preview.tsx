// components/ImagePreview.jsx
import {useState, WheelEventHandler} from 'react';
import Image from 'next/image';
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

/**
 * @description 一个可复用的图片预览组件，带加载效果与淡入过渡
 * @param {string} url - 图片地址
 * @param {string} alt - 图片描述 (alt 文本)
 * @param {number} width - 图片显示宽度
 * @param {number} height - 图片显示高度
 * @param {string} blurDataURL - 用于占位的 Base64 小图，可以提升加载体验
 * @param {string} className - 自定义类名
 */
export default function ImagePreview({
                                         url = '',
                                         alt = 'image',
                                         width = 300,
                                         height = 200,
                                         blurDataURL = '',
                                         className,
                                     }: ImagePreviewProps) {
    // 控制预览弹窗是否可见
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    // 控制图片的缩放和旋转
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);

    // 是否正在加载大图
    const [isLoading, setIsLoading] = useState(false);
    // 是否大图已完成加载，用于淡入效果
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // 打开大图预览时，处理锁滚动并重置加载状态
    const openPreview = () => {
        setIsPreviewVisible(true);
        setIsLoading(true);
        setIsImageLoaded(false);
        document.body.style.overflow = 'hidden';
    };

    // 关闭预览时，重置组件状态
    const closePreview = () => {
        setIsPreviewVisible(false);
        document.body.style.overflow = 'auto';
        setScale(1);
        setRotate(0);
    };

    // 拼接图片地址
    const resolveImage = (url:string) => {
        return "http://localhost:4536/api/public/images/" + url
    };

    // 鼠标滚轮事件，用于缩放图片
    const handleWheel = (e:any) => {
        e.preventDefault();
        const zoomStep = 0.1;
        if (e.deltaY < 0) {
            // 向上滚动 -> 放大
            setScale((prev) => prev + zoomStep);
        } else {
            // 向下滚动 -> 缩小（最小不能小于 0.2）
            setScale((prev) => Math.max(prev - zoomStep, 0.2));
        }
    };

    // 监听手机触摸事件，用于缩放图片 (根据需要稍作修改)
    const handleTouch = (e:any) => {
        e.preventDefault();
        const zoomStep = 0.01;
        if (e.touches.length === 2) {
            const x = e.touches[0].clientX - e.touches[1].clientX;
            const y = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.sqrt(x * x + y * y);
            const scaleAmount = distance / 1000;
            setScale((prev) => prev + scaleAmount * zoomStep);
        }
    };

    // 旋转操作
    const handleRotate = () => {
        setRotate((prev) => (prev + 90) % 360);
    };

    // 复制图片链接
    const copyLink = () => {
        navigator.clipboard.writeText(resolveImage(url));
        toast.success('图片链接已复制', {
            duration: 1000,
            position: "top-left",
        });
    };

    // 类名

    return (
        <>
            {/* 缩略图 (点击后弹出大图预览) */}
            <div className="cursor-pointer inline-block" onClick={openPreview}>
                <Image
                    src={resolveImage(url)}
                    alt={alt}
                    width={width}
                    height={height}
                    placeholder={blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={blurDataURL}
                    quality={5}
                    className={cn("rounded p-1 transition-all duration-200 hover:opacity-80" , className)}
                />
            </div>

            {/* 预览弹窗 */}
            {isPreviewVisible && (
                <div
                    className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onWheel={handleWheel}
                    onTouchMove={handleTouch}
                >
                    {/* 加载动画（可根据需要修改图标或样式） */}
                    {isLoading && (
                        <div
                            className="absolute w-10 h-10 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
                    )}
                    {/* 点击蒙层外部可关闭预览 */}
                    <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={closePreview}
                    />
                    {/* 大图 */}
                    <Image
                        src={resolveImage(url)}
                        alt={alt}
                        width={width}
                        height={height}
                        quality={100}
                        style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                            transformOrigin: 'center center',
                            transition: 'transform 0.2s linear, opacity 0.3s ease-in-out',
                            // 当加载完成后，opacity=1 显示大图，否则保持较低透明度
                            opacity: isImageLoaded ? 1 : 0.2,
                        }}
                        className="rounded shadow dark:shadow-none dark:border dark:border-gray-700"
                        // 当大图加载完成时，把加载状态改为 false 并打开淡入效果
                        onLoadingComplete={() => {
                            setIsLoading(false);
                            setIsImageLoaded(true);
                        }}
                    />

                    {/* 操作按钮组（右侧浮动） */}
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
                    </div>
                </div>
            )}
        </>
    );
}