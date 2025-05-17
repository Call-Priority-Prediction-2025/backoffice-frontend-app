"use client"

import MenuLayout from "@/app/ui/menu-layout";
import ModelManageAction from "@/app/ui/model-manage/model-manage-action";
import WithAuth from "@/app/ui/auth/with-auth";

function Page() {
    return (
        <MenuLayout titleHeader="Kelola Model Prediksi">
            <ModelManageAction />
        </MenuLayout>
    )
}

export default WithAuth(Page, ["admin"]);