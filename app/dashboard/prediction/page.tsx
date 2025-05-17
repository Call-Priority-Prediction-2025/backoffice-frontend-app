import MenuLayout from "@/app/ui/menu-layout";
import PredictAction from "@/app/ui/prediction/predict-action";

export const metadata = {
    title: 'Prediksi Panggilan | Backoffice',
    description: 'Deskripsi halaman ini',
}

export default function Page() {
    return (
        <MenuLayout titleHeader="Rekomendasi Panggilan">
            <PredictAction />
        </MenuLayout>
    )
}