'use client';

import WithAuth from "@/app/ui/auth/with-auth";
import MenuLayout from "@/app/ui/menu-layout";
import PredictReviewAction from "@/app/ui/prediction-review/predict-review-action";

function Page() {
    return (
        <MenuLayout titleHeader="Review Rekomendasi Panggilan">
            <PredictReviewAction />
        </MenuLayout>
    )
}

export default WithAuth(Page, ["admin"]);