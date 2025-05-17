"use client"
import MenuContainer from "../menu-container"
import { ButtonSubmit } from "../buttons"
import TableListModel from "./tabel-list-model"
import { FileInput, Label, Select, Spinner, Badge, Modal } from "flowbite-react"
import { useState } from "react"
import { useModelPredictors } from "@/app/hooks/model-manage-hook"
import MultiselectDropdown from "./multiselect-dropdown"
import { ModelPredictsInAutoChoose } from "@/app/lib/types"
import Swal from "sweetalert2"
import { predictModelCompare } from "@/app/services/prediction-service"


export default function AutoChooseAction() {
    // Open Modal
    const [openModal, setOpenModal] = useState(false);
    // Get List Prediction Models List
    const { data, error, refetch } = useModelPredictors();
    const [modelsPredictor, setModelsPredictor] = useState<ModelPredictsInAutoChoose[]>([])
    const [inputMultipleSelect, setInputMultipleSelect] = useState<ModelPredictsInAutoChoose[]>([])
    // Input to compare / auto-choose model
    const [modelsToCompare, setModelsToCompare] = useState<ModelPredictsInAutoChoose[]>([]);
    const [validationFile, setValidationFile] = useState<File | null>(null);

    const [isComparing, setIsComparing] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
        setModelsPredictor(data);
        setModelsToCompare([]);
    }

    const handleChangeValidationFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setValidationFile(event.target.files[0]);
    }

    const handleChangeMultipleSelectValue = (values: ModelPredictsInAutoChoose[]) => {
        setInputMultipleSelect(values);
    }

    const handleSubmitModal = () => {
        if (inputMultipleSelect.length < 3) {
            Swal.fire({
                title: 'Warning',
                text: 'Pilih minimal 3 model prediksi',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
            return;
        } else if (inputMultipleSelect.length > 5) {
            Swal.fire({
                title: 'Warning',
                text: 'Pilih maksimal 5 model prediksi',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        setModelsToCompare(inputMultipleSelect);
    }

    const handleRunCompareModels = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const confirmation = await Swal.fire({
            title: 'Auto Choose System Model',
            text: "Apakah anda yakin ingin mengubah model prediksi sistem?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true,
        })

        if (confirmation.isConfirmed) {
            try {
                // request to backend
                setIsComparing(true)

                const updatedModels = [...modelsToCompare];

                for (let i = 0; i < updatedModels.length; i++) {
                    const model = updatedModels[i];

                    console.log("model to compare in looping: ", modelsToCompare)

                    let formData = new FormData();
                    formData.append("validation_file", validationFile!);
                    formData.append("model_to_compare", model.file_model_name);

                    let result = await predictModelCompare(formData);

                    if (result.error) throw new Error(result.error.message)

                    // update model setelah selesai comparing
                    updatedModels[i] = {
                        ...model,
                        result_score: result.data.score_total_correct,
                        is_done: true
                    }

                    setModelsToCompare([...updatedModels]);
                }


                Swal.fire({
                    text: "Proses sukses",
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3200
                })
            } catch (error: any) {
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            } finally {
                setIsComparing(false)
            }
        } else if (confirmation.isDismissed) {
            Swal.fire({
                title: 'Dibatalkan',
                text: 'Hapus model prediksi dibatalkan',
                icon: 'info',
                confirmButtonText: 'Okay'
            })
        }
    }

    console.log(modelsToCompare)

    return (
        <div className="flex flex-col gap-9">
            <MenuContainer containerSize="w-[550px]" titleMenu="Input File Validasi">
                <form>
                    <div className="flex flex-col gap-5">
                        <div>
                            <div className="mb-2 block">
                                <Label className="text-sm" htmlFor="file-upload" value="File input data validasi" />
                            </div>
                            <FileInput id="file-upload" name="file" onChange={handleChangeValidationFile} required={true} />
                        </div>
                    </div>
                    <div className="mt-6 mb-4">
                        <button onClick={(e) => handleRunCompareModels(e)} disabled={validationFile && modelsToCompare.length > 0 ? false : true} className="w-auto bg-[#5884C4] hover:bg-[#3062ae] text-white text-[16px] font-medium py-1 px-10 rounded-[6px] drop-shadow-lg">Mulai</button>
                        {
                            isComparing && <Spinner className="ms-2" aria-label="Medium sized spinner example" size="lg" />
                        }
                    </div>
                </form>
            </MenuContainer>
            <MenuContainer containerSize="" titleMenu="Komparasi Model Prediksi">
                <div className="flex justify-between">
                    {/* Badge Information Current Selected Model */}
                    <div>
                        <Badge color="warning" size="md">
                            Current System Predictor: best_model_1.pkl
                        </Badge>
                    </div>

                    {/* Button to show modal mutiple choice model to compare */}
                    <div>
                        <button onClick={handleOpenModal} className="w-auto bg-[#5884C4] hover:bg-[#3062ae] text-white text-[16px] font-medium py-1 px-10 rounded-[6px] drop-shadow-lg">Pilih Opsi Model</button>
                    </div>
                </div>
                <div className="mt-6">
                    <TableListModel modelsToCompare={modelsToCompare} isComparing={isComparing} />
                </div>

                {/* Modal */}
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Pilih Model Prediksi</Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>
                                <MultiselectDropdown option={modelsPredictor} onChange={handleChangeMultipleSelectValue} />
                            </div>
                            <div className="mt-5">
                                <button onClick={handleSubmitModal} className="w-full py-1 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* End Modal */}
            </MenuContainer>
        </div>
    )
}