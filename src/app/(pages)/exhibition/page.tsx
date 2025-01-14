"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/utils/request";
import { throttle } from "@/utils/method";
import ImagePreview from "@/components/image-preview";
import Loader from "@/components/loader";
import { Image } from "@/types/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

/**
 * SWR key generator:
 * - If the previous fetch returns an empty array, it implies no more data.
 * - Otherwise, increment the page index.
 */
const getKey = (pageIndex: number, previousPageData: Image[]) => {
    if (previousPageData && !previousPageData.length) return null; // no more data
    return `/public/images?page=${pageIndex + 1}&page_size=10`;
};

export default function Page() {
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // 搜索关键词
    const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(getKey, fetcher, {
        revalidateFirstPage: false,
        initialSize: 2, // how many pages to load initially
        onSuccess: () => setLoadingMore(false),
    });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    /**
     * Intersection observer callback:
     * - when the sentinel enters view, increment page size
     */
    const handleIntersect: IntersectionObserverCallback = useCallback(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !isLoading && !isValidating) {
                setLoadingMore(true);
                setSize((prevSize) => prevSize + 1);
            }
        },
        [isLoading, isValidating, setSize]
    );

    /**
     * Set up the intersection observer on the sentinel element
     */
    useEffect(() => {
        const observer = new IntersectionObserver(throttle(handleIntersect, 300), {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        });
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [handleIntersect]);

    // If data is undefined or still fetching the initial pages, show a page-wide loader
    if (!data || isLoading) {
        return <Loader />;
    }

    // 过滤图片数据
    const filteredImages = data.flat().filter((image) =>
        image.file_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            {/* 搜索框 */}
            <div className="mb-4">
                <Input
                    placeholder="搜索图片"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* 瀑布流图片展示 */}
            <div className="gap-1 columns-2 md:columns-3 lg:columns-4">
                {filteredImages.map((image) => (
                    <div key={image.id} className=" break-inside-avoid">
                        <ImagePreview
                            url={image.file_name}
                            alt={image.file_name}
                            width={image.width}
                            height={image.height}
                        />
                    </div>
                ))}
            </div>

            {/* 加载更多提示 */}
            <div ref={loadMoreRef} className="h-20 flex justify-center items-center">
                {loadingMore || isValidating ? (
                    <Loader />
                ) : (
                    <p className="text-sm text-gray-500">没有更多图片了</p>
                )}
            </div>
        </div>
    );
}