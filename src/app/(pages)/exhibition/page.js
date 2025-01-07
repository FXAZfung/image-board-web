"use client";
import useSWRInfinite from "swr/infinite";
import {fetcher} from "@/utils/request";
import {useEffect, useRef} from "react";
import {throttle} from "@/utils/method";
import ImageWrapper from "@/components/image-wrapper";

const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // 已经到最后一页
    return `http://localhost:4536/api/public/images?page=${pageIndex + 1}&page_size=10`; // SWR key
}

export default function Page() {
    const {data, size, setSize, isLoading} = useSWRInfinite(getKey, fetcher, {
        revalidateFirstPage: false,
        initialSize: 2,
    });
    const isFetching = useRef(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isFetching.current) {
                isFetching.current = true;
                setSize(size + 1).finally(() => {
                    isFetching.current = false;
                });
            }
        };

        const handleScrollWithTh = throttle(handleScroll, 300);

        window.addEventListener("scroll", handleScrollWithTh);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [size, setSize]);

    if (!data || isLoading) {
        return "loading...";
    }

    return (
        <>
            <div className="container columns-2 md:columns-3 lg:columns-4 gap-0">
                {data.map((images, index) => {
                    return images.map(image =>
                        <ImageWrapper key={image.id} image={image}/>
                    );
                })}
            </div>
        </>
    );
}