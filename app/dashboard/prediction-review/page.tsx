import MenuLayout from "@/app/ui/menu-layout";
import PredictReviewAction from "@/app/ui/prediction-review/predict-review-action";

export default function Page() {
    return (
        <MenuLayout titleHeader="Review Rekomendasi Panggilan">
            <PredictReviewAction />
        </MenuLayout>
    )
}