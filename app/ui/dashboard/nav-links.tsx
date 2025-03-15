'use client'

import { usePathname } from "next/navigation";
import { SettingIcon, PaperIcon, UserListIcon, ReviewIcon } from "../icons";
import LinkPage from "./link";

export default function NavLinks() {
    return (
        <div className="flex flex-col gap-3">
            <LinkPage href={"/dashboard/model-manage"} IconComponent={SettingIcon} text={"Kelola Model"} />
            <LinkPage href={"/dashboard/prediction-review"} IconComponent={ReviewIcon} text={"Review Rekomendasi Panggilan"} />
            <LinkPage href={"/dashboard/prediction"} IconComponent={PaperIcon} text={"Rekomendasi Panggilan"} />
            <LinkPage href={"/dashboard/user-manage"} IconComponent={UserListIcon} text={"Kelola User"} />
        </div>
    )
}