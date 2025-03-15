"use client"

import { Table } from "flowbite-react"
import { useModelPredictors } from "@/app/hooks/model-manage-hook"
import { Button } from "flowbite-react"

interface ModelPredictor {
    id: number
    file_model_name: string
    uploaded_by: number
    updated_by: number
    uploaded_at: string
    updated_at: string
}

export default function TableModelPredictors(
    {
        modelPredictors,
        handleDelete,
        handleChange
    }:
        {
            modelPredictors: ModelPredictor[],
            handleDelete: (id: number) => void,
            handleChange: (id: number) => void
        }
) {

    return (
        <div className="overflow-scroll">
            <Table className="text-center">
                <Table.Head>
                    <Table.HeadCell>Id Model</Table.HeadCell>
                    <Table.HeadCell>File Model Name</Table.HeadCell>
                    <Table.HeadCell>Uploaded By</Table.HeadCell>
                    <Table.HeadCell>Updated By</Table.HeadCell>
                    <Table.HeadCell>Uploaded at</Table.HeadCell>
                    <Table.HeadCell>Updated at</Table.HeadCell>
                    <Table.HeadCell>Option</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        modelPredictors && modelPredictors.length > 0 ? modelPredictors.map((item: ModelPredictor, index: number) => (
                            <Table.Row key={index}>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.file_model_name}</Table.Cell>
                                <Table.Cell>{item.uploaded_by}</Table.Cell>
                                <Table.Cell>{item.updated_by}</Table.Cell>
                                <Table.Cell>{item.uploaded_at}</Table.Cell>
                                <Table.Cell>{item.updated_at}</Table.Cell>
                                <Table.Cell className="flex justify-center gap-2">
                                    <Button onClick={() => handleChange(item.id)} outline color="warning">change</Button>
                                    <Button onClick={() => handleDelete(item.id)} outline color="failure">delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )) : (
                            <Table.Row className="text-center bg-yellow-100 dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell colSpan={7}>Belum ada file model</Table.Cell>
                            </Table.Row>
                        )
                    }

                </Table.Body>
            </Table>
        </div>
    )
}