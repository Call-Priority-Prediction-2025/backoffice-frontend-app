import Link from "next/link";
import Image from "next/image";
import NavLinks from "@/app/ui/dashboard/nav-links"
export default function Sidenav() {
    return (
        <div className="flex flex-col">
            <div>
                <Link className="" href="/dashboard/home">
                    <Image src={"/app-logo.png"} alt="logo" width={320} height={320} />
                </Link>
            </div>
            <div className="mt-12 ">
                <NavLinks />
            </div>
        </div>
    )
}