"use client"

import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/app/ui/dashboard/nav-links"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/app/lib/types";

export default function Sidenav() {

    const [currentUserRole, setCurrentUserRole] = useState("");


    useEffect(() => {
        const currentToken = Cookies.get("token");
        const userRole = jwtDecode<JwtPayload>(currentToken!).user_role;

        setCurrentUserRole(userRole);
    }, [])

    return (
        <div className="flex flex-col">
            <div>
                <Link className="" href="/dashboard/home">
                    <Image src={"/app-logo.png"} alt="logo" width={320} height={320} />
                </Link>
            </div>
            <div className="mt-12 ">
                <NavLinks userRole={currentUserRole} />
            </div>
        </div>
    )
}