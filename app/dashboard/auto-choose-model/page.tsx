import AutoChooseAction from "@/app/ui/auto-choose-model/auto-choose-action";
import MenuLayout from "@/app/ui/menu-layout";
import ModelManageAction from "@/app/ui/model-manage/model-manage-action";
import PredictAction from "@/app/ui/prediction-review/predict-review-action";
import UserManageAction from "@/app/ui/user-manage/user-manage-action";

export default function Page() {
    return (
        <MenuLayout titleHeader="Auto-Choose Model">
            <AutoChooseAction />
        </MenuLayout>
    )
}