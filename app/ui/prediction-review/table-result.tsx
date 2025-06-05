'use client'

import { Table } from "flowbite-react";
import { twMerge } from "tailwind-merge";

interface ResultPredict {
    id: string;
    cust_name: string;
    age: number;
    city_domicile: string;
    occupation: string;
    marital_status: string;
    monthly_salary: number;
    depend_child: number;
    tenor: number;
    probability_rejected_call: number;
    probability_accepted_call: number;
    previous_status: number;
    predicted_status: number;
    conclusion_predict: string;
}

export default function TableResult({ data }: { data: ResultPredict[] }) {
    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[500px] mt-[32px]">
            <Table>
                <Table.Head>
                    <Table.HeadCell>priority_numb</Table.HeadCell>
                    <Table.HeadCell>proba_reject_call</Table.HeadCell>
                    <Table.HeadCell>proba_accept_call</Table.HeadCell>
                    <Table.HeadCell>predicted_status</Table.HeadCell>
                    <Table.HeadCell>previous_status</Table.HeadCell>
                    <Table.HeadCell className="bg-orange-200">conclusion_predict</Table.HeadCell>
                    <Table.HeadCell>cust_id</Table.HeadCell>
                    <Table.HeadCell>cust_name</Table.HeadCell>
                    <Table.HeadCell>age</Table.HeadCell>
                    <Table.HeadCell>domicile</Table.HeadCell>
                    <Table.HeadCell>occupation</Table.HeadCell>
                    <Table.HeadCell>marital_status</Table.HeadCell>
                    <Table.HeadCell>monthly_salary</Table.HeadCell>
                    <Table.HeadCell>depend_child</Table.HeadCell>
                    <Table.HeadCell>tenor</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        data.length > 1 ? data.map((item: ResultPredict, index: number) => (
                            <Table.Row key={index} className="bg-white text-center dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="font-bold">{index + 1}</Table.Cell>
                                <Table.Cell>{item.probability_rejected_call}</Table.Cell>
                                <Table.Cell>{item.probability_accepted_call}</Table.Cell>
                                <Table.Cell>{item.predicted_status}</Table.Cell>
                                <Table.Cell>{item.previous_status}</Table.Cell>
                                <Table.Cell className={twMerge(item.conclusion_predict == "correct" ? "bg-green-400" : "bg-red-400", "text-white font-semibold")}>{item.conclusion_predict}</Table.Cell>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.cust_name}</Table.Cell>
                                <Table.Cell>{item.age}</Table.Cell>
                                <Table.Cell>{item.city_domicile}</Table.Cell>
                                <Table.Cell>{item.occupation}</Table.Cell>
                                <Table.Cell>{item.marital_status}</Table.Cell>
                                <Table.Cell>{item.monthly_salary}</Table.Cell>
                                <Table.Cell>{item.depend_child}</Table.Cell>
                                <Table.Cell>{item.tenor}</Table.Cell>
                            </Table.Row>
                        )) : (
                            <Table.Row className=" text-center bg-yellow-100 dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell colSpan={14}>Belum ada hasil</Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table>
        </div>
    )
}