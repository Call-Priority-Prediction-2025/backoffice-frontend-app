'use client'

import { usePathname } from "next/navigation";
import { SettingIcon, PaperIcon, UserListIcon, ReviewIcon, LogoutIcon } from "../icons";
import LinkPage from "./link";

export default function NavLinks({ userRole }: { userRole: string }) {

    const roleAccess: { [key: string]: string[] } = {
        admin: ["model-manage", "prediction-review", "prediction", "user-manage"],
        user: ["prediction"]
    }

    const allowedMenus = userRole && roleAccess[userRole] ? roleAccess[userRole] : [];

    return (
        <div className="flex flex-col gap-3">
            {allowedMenus.includes("model-manage") && <LinkPage href={"/dashboard/model-manage"} IconComponent={SettingIcon} text={"Kelola Model"} />}
            {allowedMenus.includes("prediction-review") && <LinkPage href={"/dashboard/prediction-review"} IconComponent={ReviewIcon} text={"Review Rekomendasi Panggilan"} />}
            {allowedMenus.includes("prediction") && <LinkPage href={"/dashboard/prediction"} IconComponent={PaperIcon} text={"Rekomendasi Panggilan"} />}
            {allowedMenus.includes("user-manage") && <LinkPage href={"/dashboard/user-manage"} IconComponent={UserListIcon} text={"Kelola User"} />}
            {/* <LinkPage href={"/dashboard/auto-choose-model"} IconComponent={SettingIcon} text={"Auto-Choose Model"} /> */}
            <LinkPage href={"/logout"} IconComponent={LogoutIcon} text={"Logout"} />
        </div>
    )
}