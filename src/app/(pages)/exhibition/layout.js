import Navbar from "@/components/navbar";

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <div className="pt-16">{children}</div>
        </div>
    )
}