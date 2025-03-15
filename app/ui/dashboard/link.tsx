'user client'

import { useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface linkPageProps {
    href: string;
    IconComponent: React.FC<any>;
    text: string;
}

export default function LinkPage({ href, IconComponent, text }: linkPageProps) {
    const pathname = usePathname()

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };

    return (
        <Link href={href} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={twMerge("flex items-center py-[8px] px-2 hover:bg-blue-500 hover:rounded-xl hover:text-white hover:transition-all", pathname === href && "bg-blue-500 text-white rounded-xl")}>
            <IconComponent isHovered={isHovered} isSelected={pathname === href} />
            <span className="ml-2 font-medium text-[16px]">{text}</span>
        </Link>
    )
}