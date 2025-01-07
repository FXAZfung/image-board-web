import Image from "next/image";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import {useLayoutEffect, useState} from "react";
import {Button} from "@/components/ui/button";

export default function ImageWrapper({image}) {


    const resolveImage = (image) => {
        return "http://localhost:4536/api/public/images/" + image.file_name;
    }

    return (
        <div>
            <Zoom ZoomContent={CustomZoomContent}>
                <Image className="p-1" key={image.id} src={resolveImage(image)} width={image.width}
                       height={image.height}
                       alt={image.file_name}
                />
            </Zoom>
        </div>
    )
}

const CustomZoomContent = ({
                               buttonUnzoom, // default unzoom button
                               modalState,   // current state of the zoom modal: UNLOADED, LOADING, LOADED, UNLOADING
                               img,          // your image, prepped for zooming
                               //onUnzoom,   // unused here, but a callback to manually unzoom the image and
                               //   close the modal if you want to use your own buttons or
                               //   listeners in your custom experience
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