'use client'

import { useUsers } from "@/app/hooks/user-manage-hook";
import MenuContainer from "../menu-container";
import TableUsers from "./table-users";
import { FileInput, Label, Modal, Select, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { CreateUser, User } from "@/app/lib/types";
import { createUser, deleteUser, getOneUser, updateUser } from "@/app/services/user-manage-service";
import Swal from "sweetalert2";

export default function UserManageAction() {
    const { data: usersData, error, refetch } = useUsers();
    const [oneUser, setOneUser] = useState<User>({
        id: 0,
        usercode: "",
        username: "",
        role: "user",
        password: null,
        confirm_password: null
    })
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createUserData, setCreateUserData] = useState<CreateUser>({
        usercode: "",
        username: "",
        password: "",
        role: "user",
        confirm_password: ""
    })

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);

            console.log(createUserData);

            const result = await createUser(createUserData);

            Swal.fire({
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 3600,
                toast: true,
                position: 'top-end',
                timerProgressBar: true
            })

            refetch();
        } catch (error: any) {
            if (error.message?.detail) {
                Swal.fire({
                    title: 'Oops...',
                    text: error.message.detail,
                    icon: 'warning',
                    confirmButtonText: 'okay'
                })
            }

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

    const handleDeleteUser = async (id: number) => {
        const confirmation = await Swal.fire({
            title: 'Hapus Data User',
            text: "Apakah anda yakin ingin menghapus user ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true,
        })

        if (confirmation.isConfirmed) {
            try {
                const result = await deleteUser(id);

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
                text: 'Hapus user dibatalkan',
                icon: 'info',
                confirmButtonText: 'Okay'
            })
        }
    }

    const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);

            const result = await updateUser(oneUser.id, oneUser);

            Swal.fire({
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 3600,
                toast: true,
                position: 'top-end',
                timerProgressBar: true
            })

            refetch();
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

    const showModalUpdate = (id: number) => {
        setOpenModalUpdate(true);
        const fetchOneUser = async () => {
            try {
                const result = await getOneUser(id);
                setOneUser(result.data);
            } catch (error: any) {
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            }
        }

        fetchOneUser();
    }

    return (
        <div>
            <MenuContainer containerSize="w-full" titleMenu="List User">
                <div>
                    <button onClick={() => setOpenModalCreate(true)} className="py-1 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 drop-shadow-md">Tambah User</button>

                    {/* Modal Create */}
                    <Modal show={openModalCreate} onClose={() => setOpenModalCreate(false)}>
                        <Modal.Header>
                            Tambah User Baru
                            {
                                loading && <Spinner className="text-white ms-2 text-center" size="md" />
                            }
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="usercode" value="User Code" />
                                    </div>
                                    <TextInput onChange={(e) => setCreateUserData({ ...createUserData, usercode: e.target.value })} id="usercode" name="usercode" type="text" sizing="md" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="User Name" />
                                    </div>
                                    <TextInput onChange={(e) => setCreateUserData({ ...createUserData, username: e.target.value })} id="username" name="username" type="text" sizing="md" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="role" value="Role User" />
                                    </div>
                                    <Select onChange={(e) => setCreateUserData({ ...createUserData, role: e.target.value })} value={createUserData.role} id="role" name="role" required>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value="Password" />
                                    </div>
                                    <TextInput onChange={(e) => setCreateUserData({ ...createUserData, password: e.target.value })} id="password" name="password" type="text" sizing="md" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="confirm_password" value="Confirm Password" />
                                    </div>
                                    <TextInput onChange={(e) => setCreateUserData({ ...createUserData, confirm_password: e.target.value })} id="confirm_password" name="confirm_password" type="text" sizing="md" required />
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="w-full py-1 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md">
                                        Submit

                                    </button>
                                </div>
                                <div className="text-center">

                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>

                    {/* Modal Update */}
                    <Modal show={openModalUpdate} onClose={() => setOpenModalUpdate(false)}>
                        <Modal.Header>
                            Update Data User
                            {
                                loading && <Spinner className="text-white ms-2 text-center" size="md" />
                            }
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleUpdateUser} className="flex flex-col gap-3">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="usercode" value="User Code" />
                                    </div>
                                    <TextInput value={oneUser.usercode} id="usercode" name="usercode" type="text" sizing="md" disabled />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="User Name" />
                                    </div>
                                    <TextInput value={oneUser.username} onChange={(e) => setOneUser({ ...oneUser, username: e.target.value })} id="username" name="username" type="text" sizing="md" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="role" value="Role User" />
                                    </div>
                                    <Select onChange={(e) => setOneUser({ ...oneUser, role: e.target.value })} value={oneUser.role} id="role" name="role" >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value="Password" />
                                    </div>
                                    <TextInput onChange={(e) => setOneUser({ ...oneUser, password: e.target.value })} id="password" name="password" type="text" sizing="md" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="confirm_password" value="Confirm Password" />
                                    </div>
                                    <TextInput onChange={(e) => setOneUser({ ...oneUser, confirm_password: e.target.value })} id="confirm_password" name="confirm_password" type="text" sizing="md" />
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="w-full py-1 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md">
                                        Submit
                                    </button>
                                </div>
                                <div className="text-center">

                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>

                </div>
                <div className="mt-5">
                    <TableUsers showModalUpdate={showModalUpdate} handleDelete={handleDeleteUser} usersData={usersData} />
                </div>
            </MenuContainer>
        </div>
    )
}