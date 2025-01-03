import Link from "next/link";
import ToggleTheme from "@/components/toggle-theme";


const navMap = [
    { name: "首页", url: "/" },
    { name: "展览", url: "/" },
    { name: "控制台", url: "/dashboard" },
];


export default async function Navbar() {

    return (
        <nav className=" shadow-lg fixed top-0 w-full z-10 flex items-center justify-between px-4 py-2 h-16 md:px-8">
            <div className="flex items-center gap-2">
                <img
                    width={40}
                    height={40}
                    alt="apple-touch-icon"
                    src={"/apple-touch-icon.png"}
                    className="relative border-2 border-transparent h-8 w-8 object-cover object-top block dark:hidden "
                />
                <img
                    width={40}
                    height={40}
                    alt="apple-touch-icon"
                    src={"/apple-touch-icon-dark.png"}
                    className="relative border-2 border-transparent h-8 w-8 object-cover object-top hidden dark:block "
                />
                IM 图床</div>
            <div className="flex items-center gap-5">
                <ul className="flex items-center space-x-4">
                    {navMap.map((item, index) => (
                        <li key={index}>
                            <Link href={item.url}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ToggleTheme />
            </div>
        </nav>
    );
}
