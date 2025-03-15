import MenuLayout from "@/app/ui/menu-layout";
import PredictAction from "@/app/ui/prediction/predict-action";

export default function Page() {
    return (
        <MenuLayout titleHeader="Rekomendasi Panggilan">
            <PredictAction />
        </MenuLayout>
    )
}