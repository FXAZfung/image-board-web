import Navbar from "@/components/navbar";

export default function Layout({children}) {
    return (
        <div className="flex min-h-[calc(100vh-calc(var(--spacing)*16))] flex-1 flex-col gap-4 bg-background p-4 md:p-10 md:pt-8">
            <Navbar/>
            <div>{children}</div>
        </div>
    )
}