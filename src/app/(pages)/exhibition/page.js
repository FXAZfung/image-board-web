"use client";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import {fetcher} from "@/utils/request";
import {useEffect, useRef} from "react";
import {throttle} from "@/utils/method";

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

    const resolveImage = (image) => {
        return "http://localhost:4536/api/public/images/" + image.file_name;
    };

    return (
        <>
            <div className="container columns-2 md:columns-3 lg:columns-4 gap-0">
                {data.map((images, index) => {
                    return images.map(image =>
                        <Image className="p-1" key={image.id} src={resolveImage(image)} width={image.width}
                               height={image.height}
                               alt={image.file_name}/>
                    );
                })}
            </div>
        </>
    );
}