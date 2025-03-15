'use client'

import { FileInput, Label, Select, Spinner } from "flowbite-react"
import { ButtonSubmit } from "../buttons"
import { useState } from "react"
import { submitPrediction } from "@/app/services/prediction-service"
import TableResult from "./table-result"
import MenuContainer from "../menu-container"
import Swal from "sweetalert2"

export default function PredictAction() {
    const [predictionResult, setPredictionResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true)
            const formData = new FormData(event.currentTarget);

            let result = await submitPrediction(formData);
            setPredictionResult(result.data);

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
        <div className="flex flex-col gap-9">
            <MenuContainer containerSize="w-[550px]" titleMenu="Input">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <div>
                            <div className="mb-2 block">
                                <Label className="text-sm" htmlFor="file-upload" value="File input data pelanggan" />
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
            </MenuContainer>
        </div>
    )
}