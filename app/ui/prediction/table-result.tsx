'use client'

import { ResultPredict } from "@/app/lib/types";
import { Table } from "flowbite-react";



export default function TableResult({ data }: { data: ResultPredict[] }) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head className="text-center">
                    <Table.HeadCell className="bg-orange-200">priority_numb</Table.HeadCell>
                    <Table.HeadCell>cust_id</Table.HeadCell>
                    <Table.HeadCell className="bg-blue-200">proba_reject_call</Table.HeadCell>
                    <Table.HeadCell>start time</Table.HeadCell>
                    <Table.HeadCell>cust_name</Table.HeadCell>
                    <Table.HeadCell>age</Table.HeadCell>
                    <Table.HeadCell>domicile</Table.HeadCell>
                    <Table.HeadCell>occupation</Table.HeadCell>
                    <Table.HeadCell>marital_status</Table.HeadCell>
                    <Table.HeadCell>monthly_salary</Table.HeadCell>
                    <Table.HeadCell>depend_child</Table.HeadCell>
                    <Table.HeadCell>tenor</Table.HeadCell>
                </Table.Head>
                <Table.Body className="text-center divide-y">
                    {
                        data.length > 1 ? data.map((item: ResultPredict, index: number) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="bg-orange-200 font-bold text-orange-500">{index + 1}</Table.Cell>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell className="font-bold text-blue-800 bg-blue-200">{item.probability_rejected_call}</Table.Cell>
                                <Table.Cell>{item.start_time}</Table.Cell>
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
                                <Table.Cell colSpan={11}>Belum ada hasil</Table.Cell>
                            </Table.Row>
                        )
                    }


                    {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Microsoft Surface Pro
                        </Table.Cell>
                        <Table.Cell>White</Table.Cell>
                        <Table.Cell>Laptop PC</Table.Cell>
                        <Table.Cell>$1999</Table.Cell>
                        <Table.Cell>
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row> */}
                </Table.Body>
            </Table>
        </div>
    )
}