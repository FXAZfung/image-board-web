import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Intro() {
    return (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
            <Button variant="outline" size="icon" className="rounded-full" asChild>
                <Link href="https://github.com/FXAZfung/image-board">
                    <Github />
                </Link>
            </Button>
        </div>
    )
}