"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type ImageUpload = {
    id: string
    filename: string
    url: string
    uploadTime: string
    fileSize: string
}

export function ImageUploads() {
    const [uploads, setUploads] = useState<ImageUpload[]>([
        {
            id: "1",
            filename: "example.jpg",
            url: "/placeholder.jpg",
            uploadTime: "2024-03-10 10:30",
            fileSize: "1.2MB"
        },
        {
            id: "2",
            filename: "test.png",
            url: "/placeholder.jpg",
            uploadTime: "2024-03-10 09:45",
            fileSize: "2.5MB"
        },
        // 更多示例数据...
    ])

    return (
        <div className="space-y-4">
            {uploads.map((upload) => (
                <div key={upload.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16">
                        <Image
                            src={upload.url}
                            alt={upload.filename}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{upload.filename}</p>
                        <div className="flex items-center text-xs text-gray-500">
                            <span>{upload.uploadTime}</span>
                            <span className="mx-2">•</span>
                            <span>{upload.fileSize}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}