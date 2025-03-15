import React from "react"
import Sidenav from "@/app/ui/dashboard/sidenav"



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex h-screen">
                <div className="w-[360px] flex-none px-3 py-5 border border-r-[#CFCFCF]">
                    <Sidenav />
                </div>
                <div className="flex-grow overflow-scroll bg-[#F4F4F4]">
                    {children}
                </div>
            </div>
        </div>
    )
}