'user client'

import React, { useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface linkPageProps {
    href: string;
    IconComponent: React.FC<any>;
    text: string;
}

export default function LinkPage({ href, IconComponent, text }: linkPageProps) {
    const pathname = usePathname()
    const router = useRouter()

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href === '/logout') {
            e.preventDefault();
            Cookies.remove("token");
            router.push("/auth/sign-in");
        }
    }

    return (
        <Link href={href} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={twMerge("flex items-center py-[8px] px-2 rounded-xl hover:text-white hover:transition-all", href === '/logout' ? "hover:bg-[#ffc8c6] hover:text-[#e3463d] hover:rounded-xl" : "hover:bg-[#5884C4] hover:text-white hover:rounded-xl", pathname === href && "bg-[#5884C4] text-white rounded-xl")}>
            <IconComponent isHovered={isHovered} isSelected={pathname === href} />
            <span className="ml-2 font-medium text-[16px]">{text}</span>
        </Link>
    )
}