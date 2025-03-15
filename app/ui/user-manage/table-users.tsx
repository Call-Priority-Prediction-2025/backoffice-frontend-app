'use client'

import { Button, Table } from "flowbite-react";

interface User {
    id: number
    usercode: string
    username: string
    role: string
}

export default function TableUsers({ usersData, handleDelete, showModalUpdate }: { usersData: User[], handleDelete: (id: number) => void, showModalUpdate: (id: number) => void }) {
    return (
        <div className="overflow-scroll">
            <Table className="text-center">
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>User Code</Table.HeadCell>
                    <Table.HeadCell>User Name</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        usersData && usersData.length > 0 ? usersData.map((item: User, index: number) => (
                            <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{item.usercode}</Table.Cell>
                                <Table.Cell>{item.username}</Table.Cell>
                                <Table.Cell>{item.role}</Table.Cell>
                                <Table.Cell className="flex justify-center gap-2">
                                    <Button onClick={() => showModalUpdate(item.id)} outline color="warning">update</Button>
                                    <Button onClick={() => handleDelete(item.id)} outline color="failure">delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )) :
                            <Table.Row className="text-center bg-yellow-100 dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell colSpan={7}>Belum ada user</Table.Cell>
                            </Table.Row>
                    }
                </Table.Body>
            </Table>
        </div>
    )
}