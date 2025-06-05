'use client'

import { FileInput, Label, Select, Spinner } from "flowbite-react"
import { ButtonSubmit } from "../buttons"
import { useModelPredictors } from "@/app/hooks/model-manage-hook"
import { useState } from "react"
import { submitPredictionReview } from "@/app/services/prediction-service"
import MenuContainer from "../menu-container"
import TableResult from "./table-result"
import Swal from "sweetalert2"
import TableReviewResult from "./table-review-result"
import { ReviewResultPredict } from "@/app/lib/types"

interface ModelPredictor {
    id: number
    file_model_name: string
    uploaded_by: number
    updated_by: number
    uploaded_at: string
    updated_at: string
}

export default function PredictReviewAction() {
    const { data: modelPredictors, error, refetch } = useModelPredictors();
    const [reviewPredictionResult, setReviewPredictionResult] = useState<ReviewResultPredict>({
        total_data: 0,
        total_correct: 0,
        total_wrong: 0,
        total_data_label_1: 0,
        total_correct_label_1: 0,
        total_wrong_label_1: 0,
        total_data_label_0: 0,
        total_correct_label_0: 0,
        total_wrong_label_0: 0,
    });
    const [predictionResult, setPredictionResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true)
            const formData = new FormData(event.currentTarget);

            let result = await submitPredictionReview(formData);

            console.log('result di prediction action: ', result.data.sorted_result_prediction)

            setPredictionResult(result.data.sorted_result_prediction);
            setReviewPredictionResult(result.data.review_result);
        } catch (error: any) {
            Swal.fire({
                title: 'Oops...',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'okay'
            })
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="flex flex-col gap-9 mb-7">
            <MenuContainer containerSize="w-[550px]" titleMenu="Input">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <div>
                            <div className="mb-2 block">
                                <Label className="text-sm" htmlFor="selected_model" value="Pilih model prediksi" />
                            </div>
                            <Select id="selected_model" name="selected_model" required>
                                {
                                    (modelPredictors && modelPredictors.length > 0) ? modelPredictors.map((model: ModelPredictor, index: number) => (<option key={index} value={model.file_model_name}>{model.file_model_name}</option>))
                                        : <option>belum ada opsi model</option>
                                }
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label className="text-sm" htmlFor="file-upload" value="File input riwayat panggilan" />
                            </div>
                            <FileInput id="file-upload" name="file" required={true} />
                        </div>
                    </div>
                    <div className="mt-6 mb-4">
                        <ButtonSubmit text="Mulai Prediksi" /> {loading && <Spinner className="ms-2" aria-label="Medium sized spinner example" size="lg" />}
                    </div>
                </form>
            </MenuContainer>
            <MenuContainer containerSize="" titleMenu="Hasil Rekomendasi">
                <TableResult data={predictionResult} />
                <TableReviewResult reviewResult={reviewPredictionResult} />
            </MenuContainer>
        </div>
    )
}