"use client";
import { useRef, useEffect, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/utils/request";
import { throttle } from "@/utils/method";
import ImagePreview from "@/components/image-preview";
import Loader from "@/components/loader";
import { Image } from "@/types/types";

/**
 * SWR key generator:
 *  - if previous fetch returns an empty array, it implies no more data
 *  - otherwise, increment the page index
 */
const getKey = (pageIndex: number, previousPageData: Image[]) => {
    if (previousPageData && !previousPageData.length) return null; // no more data
    return `http://localhost:4536/api/public/images?page=${pageIndex + 1}&page_size=10`;
};

export default function Page() {
    const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher, {
        revalidateFirstPage: false,
        initialSize: 2, // how many pages to load initially
    });

    // create a sentinel ref to attach to the last element
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    /**
     * Intersection observer callback - when the sentinel enters view, increment page size
     */
    const handleIntersect: IntersectionObserverCallback = useCallback(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !isLoading) {
                setSize((prevSize) => prevSize + 1);
            }
        },
        [isLoading, setSize]
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

    // if data is undefined or still fetching the initial pages
    if (!data || isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="container columns-2 gap-0 md:columns-3 lg:columns-4">
                {data.map((pageOfImages: Image[], index) => {
                    return pageOfImages.map((image) => (
                        <ImagePreview
                            key={image.id}
                            url={image.file_name}
                            alt={image.file_name}
                            width={image.width}
                            height={image.height}
                        />
                    ));
                })}
            </div>
            {/* Sentinel element to trigger infinite load when in view */}
            <div ref={loadMoreRef} className="h-10 w-full" />
        </>
    );
}