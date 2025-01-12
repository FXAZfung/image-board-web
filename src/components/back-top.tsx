"use client";
import {Button} from "@/components/ui/button";
import {ArrowUpToLine} from 'lucide-react';
import {useEffect, useState} from "react";

export default function BackTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className=" fixed bottom-8 right-8">
            {isVisible && (
                <Button className="rounded-full" variant="outline" size="icon" onClick={scrollToTop}>
                    <ArrowUpToLine />
                </Button>
            )}
        </div>
    );
}