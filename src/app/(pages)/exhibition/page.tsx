"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import useSWRInfinite from "swr/infinite";
import {fetcherPage} from "@/utils/request";
import {throttle} from "@/utils/method";
import ImagePreview from "@/components/image-preview";
import Loader from "@/components/loader";
import {Image} from "@/types/types";
import {Input} from "@/components/ui/input";

/**
 * SWR key generator:
 * - If the previous fetch returns an empty array, it implies no more data.
 * - Otherwise, increment the page index.
 */

const getKey = (pageIndex: number, previousPageData: Image[]) => {
    if (previousPageData && !previousPageData.length) return null; // 没有更多数据
    return {url: "/public/images", pageIndex, pageSize: 10}; // POST 的 URL 和页码
};

// TODO
// - 分类筛选图片
// - 复制图片BBCODE / Markdown
export default function Page() {
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // 搜索关键词
    //TODO 优化代码
    const {data, size, setSize, isLoading, isValidating} = useSWRInfinite(
        getKey, ({url, pageIndex, pageSize}) => fetcherPage(url, pageIndex + 1, pageSize), // 使用解构后的 URL 和分页参数
        {
            revalidateFirstPage: false,
            initialSize: 2, // 初始加载页数
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
        return <Loader/>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* 瀑布流图片展示 */}
            <div className="gap-1 columns-2 md:columns-3 lg:columns-4">
                {data.flat().map((image) => (
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
                    <Loader/>
                ) : (
                    <p className="text-sm text-gray-500">没有更多图片了</p>
                )}
            </div>
        </div>
    );
}