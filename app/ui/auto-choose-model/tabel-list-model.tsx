"use client"

import { ModelPredictsInAutoChoose } from "@/app/lib/types"
import { Table, Badge, Spinner } from "flowbite-react"
import { CheckCircle } from 'lucide-react';

export default function TableListModel({ modelsToCompare, isComparing }: { modelsToCompare: ModelPredictsInAutoChoose[], isComparing: boolean }) {
    return (
        <div className="overflow-scroll">
            <Table className="text-center">
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Model Prediction Name</Table.HeadCell>
                    <Table.HeadCell>Result Prediction</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        modelsToCompare.length > 0 ? modelsToCompare.map((model: ModelPredictsInAutoChoose, index: number) => (
                            <Table.Row key={model.id}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{model.file_model_name}</Table.Cell>
                                <Table.Cell> <span className="font-medium">{model.result_score != null ? model.result_score : 0}</span> correct</Table.Cell>
                                <Table.Cell>
                                    {
                                        model.is_done ? (<CheckCircle className="text-green-500 mx-auto" size={24} />) :
                                            (isComparing ? (<Spinner className="mx-auto" aria-label="Medium sized spinner example" size="sm" />) :
                                                (<Badge className="text-center" color="warning" size="md">to progress</Badge>)
                                            )

                                    }
                                </Table.Cell>
                            </Table.Row>
                        )) :
                            <Table.Row>
                                <Table.Cell colSpan={4}>No data</Table.Cell>
                            </Table.Row>
                    }

                </Table.Body>
            </Table>
        </div>
    )
}