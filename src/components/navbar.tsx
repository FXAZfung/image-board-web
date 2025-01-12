import Link from "next/link";
import ToggleTheme from "@/components/toggle-theme";

// Example navigation items
const navMap = [
    { name: "首页", url: "/" },
    { name: "展览", url: "/exhibition" },
    { name: "控制台", url: "/dashboard" },
];

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-10 flex h-16 items-center justify-between bg-background px-4 py-2 md:px-8">
            <div className="flex items-center gap-2">
                {/* Light mode logo */}
                <img
                    width={40}
                    height={40}
                    alt="logo-light"
                    src="/apple-touch-icon.png"
                    className="block h-8 w-8 object-cover object-top dark:hidden"
                />
                {/* Dark mode logo */}
                <img
                    width={40}
                    height={40}
                    alt="logo-dark"
                    src="/apple-touch-icon-dark.png"
                    className="hidden h-8 w-8 object-cover object-top dark:block"
                />
                <span>IM 图床</span>
            </div>
            <div className="flex items-center gap-5">
                <ul className="flex items-center space-x-4">
                    {navMap.map((item) => (
                        <li key={item.url}>
                            <Link href={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <ToggleTheme />
            </div>
        </nav>
    );
}