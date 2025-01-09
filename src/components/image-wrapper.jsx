import Image from "next/image";
import {Controlled as ControlledZoom} from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {Button} from "@/components/ui/button";

export default function ImageWrapper({image}) {
    const [quality, setQuality] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleZoomChange = useCallback(shouldZoom => {
        setIsZoomed(shouldZoom);
    }, []);

    const resolveImage = (image) => {
        return "http://localhost:4536/api/public/images/" + image.file_name;
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
                <Image quality={quality} className="p-1" key={image.id} src={resolveImage(image)} width={image.width}
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    useLayoutEffect(() => {
        if (modalState === 'LOADED') {
            setIsModalOpen(true)
        } else if (modalState === 'UNLOADING') {
            setIsModalOpen(false)
        }
    }, [modalState])


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