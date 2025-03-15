import MenuLayout from "@/app/ui/menu-layout";
import ModelManageAction from "@/app/ui/model-manage/model-manage-action";

export default function Page() {
    return (
        <MenuLayout titleHeader="Kelola Model Prediksi">
            <ModelManageAction />
        </MenuLayout>
    )
}