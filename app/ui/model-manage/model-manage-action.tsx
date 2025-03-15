"use client"

import { useModelPredictors } from "@/app/hooks/model-manage-hook";
import MenuContainer from "../menu-container";
import TableModelPredictors from "./table-model-predictors";
import React, { useEffect, useState } from "react";
import { Modal, Label, FileInput, Spinner } from "flowbite-react";
import { deleteModelPredictor, getOneModelPredictor, submitNewFileModel, submitUpdateFileModel } from "@/app/services/model-manage-service";
import Swal from "sweetalert2";
import getPayloadToken from "@/app/services/get-payload-token";
import { verifyToken } from "@/app/services/auth-service";

let initOnePredictor = {
    id: 0,
    file_model_name: '',
    uploaded_by: 0,
    updated_by: 0,
    uploaded_at: null,
    updated_at: null
}

const payloadToken = getPayloadToken();

export default function ModelManageAction() {
    const { data: listModelPredictors, error, refetch } = useModelPredictors();
    const [openModal, setOpenModal] = useState(false);
    const [openModalChange, setOpenModalChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onePredictor, setOnePredictor] = useState(initOnePredictor);


    const handleSubmitFileModel = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData(event.currentTarget);

            let result = await submitNewFileModel(formData);

            Swal.fire({
                text: result.message,
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3200
            })

            refetch()
        } catch (error: any) {
            Swal.fire({
                title: 'Oops...',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'okay'
            })
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: number) => {
        const confirmation = await Swal.fire({
            title: 'Hapus Model Prediksi',
            text: "Apakah anda yakin ingin menghapus model prediksi ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true,
        })

        if (confirmation.isConfirmed) {
            try {
                let result = await deleteModelPredictor(id);

                Swal.fire({
                    text: result.message,
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3200
                })
                refetch()
            } catch (error: any) {
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
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

    const handleSubmitUpdateFileModel = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData(event.currentTarget);

            let result = await submitUpdateFileModel(formData, onePredictor.id);

            Swal.fire({
                text: result.message,
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3200
            })


            refetch()
        } catch (error: any) {
            Swal.fire({
                title: 'Oops...',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'okay'
            })
        } finally {
            setLoading(false);
            setOpenModalChange(false)
        }
    }

    const showModalChange = (id: number) => {
        setOpenModalChange(true);

        const fetchPredictor = async () => {
            const result = await getOneModelPredictor(id);
            setOnePredictor(result.data);
        }
        fetchPredictor();
    }

    return (
        <div>
            <MenuContainer containerSize="w-full" titleMenu="List Model Prediksi">
                <div className="mb-5">
                    <button onClick={() => setOpenModal(true)} className="py-1 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 drop-shadow-md">+ Upload File Model</button>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Upload File Model Prediksi</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmitFileModel}>
                                <input type="hidden" name="uploader_id" value={payloadToken?.user_id} />
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="file-upload" value="Upload file" />
                                    </div>
                                    <FileInput id="file-upload" name="new_modelPred" required />
                                </div>
                                <div className="mt-8">
                                    <button type="submit" className="w-full py-1 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md">Submit</button>
                                </div>
                                <div className="text-center">
                                    {loading && <Spinner className="text-white mt-8 text-center" size="lg" />}
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <Modal dismissible show={openModalChange} onClose={() => { setOpenModalChange(false); setOnePredictor(initOnePredictor) }}>
                        <Modal.Header>Update File Model Prediksi</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmitUpdateFileModel}>
                                <input type="hidden" name="updater_id" value={payloadToken?.user_id} />
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="file-upload" value="Change file" />
                                    </div>
                                    <FileInput id="file-upload" name="new_modelPred" required />
                                    {onePredictor.file_model_name && (
                                        <p className="mt-2 text-sm text-gray-600">Current file: <span className="font-bold">{onePredictor.file_model_name}</span></p>
                                    )}
                                </div>
                                <div className="mt-8">
                                    <button type="submit" className="w-full py-1 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md">Update File</button>
                                </div>
                                <div className="text-center">
                                    {loading && <Spinner className="text-white mt-8 text-center" size="lg" />}
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div>
                    <TableModelPredictors handleChange={showModalChange} handleDelete={handleDelete} modelPredictors={listModelPredictors} />
                </div>
            </MenuContainer>
        </div>
    )
}