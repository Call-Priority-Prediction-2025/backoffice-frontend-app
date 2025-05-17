'use client';

import WithAuth from "@/app/ui/auth/with-auth";
import MenuLayout from "@/app/ui/menu-layout";
import UserManageAction from "@/app/ui/user-manage/user-manage-action";

function Page() {
    return (
        <MenuLayout titleHeader="Kelola User">
            <UserManageAction />
        </MenuLayout>
    )
}

export default WithAuth(Page, ["admin"]);