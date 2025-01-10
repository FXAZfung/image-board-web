import Image from "next/image";
import {Controlled as ControlledZoom} from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Loader from "@/components/loader";

export default function ImageWrapper({image}) {
    const [quality, setQuality] = useState(5);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleZoomChange = useCallback(shouldZoom => {
        setIsZoomed(shouldZoom);
    }, []);

    const resolveImage = (url) => {
        return url ? "http://localhost:4536/api/public/images/" + url : null;
    }

    useEffect(() => {
        if (isZoomed) {
            setQuality(100);
        } else {
            setQuality(5);
        }
    }, [isZoomed]);

    return (
        <div>
            <ControlledZoom isZoomed={isZoomed} ZoomContent={CustomZoomContent} onZoomChange={handleZoomChange}>
                <Image loading="lazy" quality={quality} className="p-1" key={image.id}
                       src={resolveImage(image.file_name)}
                       width={image.width}
                       height={image.height}
                       alt={image.file_name}
                />
            </ControlledZoom>
        </div>
    )
}

const CustomZoomContent = ({
                               buttonUnzoom, // default unzoom button
                               modalState,   // current state of the zoom modal: UNLOADED, LOADING, LOADED, UNLOADING
                               img,          // your image, prepped for zooming
                           }) => {

    return <div className="bg-background w-full h-full">
        <Button variant="outline" asChild>
            {buttonUnzoom}
        </Button>
        {img}
        <div className="absolute bottom-2 w-full justify-center flex items-center gap-2">
            <Button variant="ghost">复制链接</Button>
            <Button variant="ghost">下载</Button>
        </div>
    </div>
}