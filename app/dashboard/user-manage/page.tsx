import MenuLayout from "@/app/ui/menu-layout";
import PredictAction from "@/app/ui/prediction-review/predict-review-action";
import UserManageAction from "@/app/ui/user-manage/user-manage-action";

export default function Page() {
    return (
        <MenuLayout titleHeader="Kelola User">
            <UserManageAction />
        </MenuLayout>
    )
}