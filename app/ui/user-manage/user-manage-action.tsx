'use client'

import { useUsers } from "@/app/hooks/user-manage-hook";
import MenuContainer from "../menu-container";
import TableUsers from "./table-users";
import { FileInput, Label, Modal, Select, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { CreateUser, ErrorDetail, User } from "@/app/lib/types";
import { createUser, deleteUser, getOneUser, updateUser } from "@/app/services/user-manage-service";
import Swal from "sweetalert2";
import ErrorWithDetail from "@/app/lib/errors";

type ValidationErrors = {
    [key: string]: string;
}

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

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [updateValidationErrors, setUpdateValidationErrors] = useState<ValidationErrors>({});
    const parseValidationErrors = (errorDetail: ErrorDetail[]): ValidationErrors => {
        const errors: ValidationErrors = {};

        errorDetail.forEach((error) => {
            const fieldName = error.loc[1] as string;
            errors[fieldName] = error.msg;
        })

        return errors;
    }
    const clearFieldError = (fieldName: string) => {
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        })
    }
    const clearUpdateFieldError = (fieldName: string) => {
        setUpdateValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        })
    }

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);

            setValidationErrors({});

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

            setCreateUserData({
                usercode: "",
                username: "",
                password: "",
                role: "user",
                confirm_password: ""
            });
            setOpenModalCreate(false);

            refetch();
        } catch (error: any) {
            if (error instanceof ErrorWithDetail) {
                const errors = parseValidationErrors(error.detail);
                setValidationErrors(errors);

                Swal.fire({
                    title: 'Oops...',
                    text: 'Mohon periksa kesalahan di form',
                    icon: 'warning',
                    confirmButtonText: 'okay'
                })
            } else {
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'warning',
                    confirmButtonText: 'okay'
                })
            }
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

            setUpdateValidationErrors({});

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

            setOpenModalUpdate(false);
            refetch();
        } catch (error: any) {
            if (error instanceof ErrorWithDetail) {
                const errors = parseValidationErrors(error.detail);
                setUpdateValidationErrors(errors);

                Swal.fire({
                    title: 'Oops...',
                    text: 'Mohon periksa kesalahan di form',
                    icon: 'warning',
                    confirmButtonText: 'okay'
                })
            } else {
                Swal.fire({
                    title: 'Oops...',
                    text: error.message,
                    icon: 'warning',
                    confirmButtonText: 'okay'
                })
            }
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

    const handleInputCreateChange = (fieldname: keyof CreateUser, value: string) => {
        setCreateUserData({ ...createUserData, [fieldname]: value });
        clearFieldError(fieldname);
    }

    const handleUpdateInputChange = (fieldname: keyof User, value: string | null) => {
        let processedValue: string | null = value;

        if ((fieldname === 'password' || fieldname === 'confirm_password') && value === '') {
            processedValue = null;
        }

        setOneUser({ ...oneUser, [fieldname]: processedValue });
        clearUpdateFieldError(fieldname);
    }

    const handleCloseCreateModal = () => {
        setOpenModalCreate(false);
        setValidationErrors({});
        setCreateUserData({
            usercode: "",
            username: "",
            password: "",
            role: "user",
            confirm_password: ""
        });
    }

    const handleCloseUpdateModal = () => {
        setOpenModalUpdate(false);
        setUpdateValidationErrors({});
    }

    return (
        <div>
            <MenuContainer containerSize="w-full" titleMenu="List User">
                <div>
                    <button onClick={() => setOpenModalCreate(true)} className="py-1 px-6 bg-[#5884C4] text-white rounded-md hover:bg-[#3062ae] drop-shadow-md">Tambah User</button>

                    {/* Modal Create */}
                    <Modal show={openModalCreate} onClose={handleCloseCreateModal}>
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
                                    <TextInput
                                        onChange={(e) => handleInputCreateChange('usercode', e.target.value)}
                                        value={createUserData.usercode}
                                        id="usercode" name="usercode"
                                        type="text"
                                        sizing="md"
                                        color={validationErrors.usercode ? 'failure' : undefined}
                                        helperText={validationErrors.usercode && (
                                            <span className="text-red-600 text-sm">
                                                {validationErrors.usercode}
                                            </span>
                                        )} required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="User Name" />
                                    </div>
                                    <TextInput
                                        onChange={(e) => handleInputCreateChange('username', e.target.value)}
                                        value={createUserData.username}
                                        id="username"
                                        name="username"
                                        type="text"
                                        sizing="md"
                                        color={validationErrors.username ? "failure" : undefined}
                                        helperText={validationErrors.username && (
                                            <span className="text-red-600 text-sm">
                                                {validationErrors.username}
                                            </span>
                                        )}
                                        required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="role" value="Role User" />
                                    </div>
                                    <Select
                                        onChange={(e) => handleInputCreateChange('role', e.target.value)}
                                        value={createUserData.role}
                                        id="role"
                                        name="role"
                                        required
                                        color={validationErrors.role ? "failure" : undefined}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value="Password" />
                                    </div>
                                    <TextInput
                                        onChange={(e) => handleInputCreateChange('password', e.target.value)}
                                        value={createUserData.password}
                                        id="password"
                                        name="password"
                                        type="text"
                                        sizing="md"
                                        required
                                        color={validationErrors.password ? "failure" : undefined}
                                        helperText={validationErrors.password && (
                                            <span className="text-red-600 text-sm">
                                                {validationErrors.password}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="confirm_password" value="Confirm Password" />
                                    </div>
                                    <TextInput
                                        onChange={(e) => handleInputCreateChange('confirm_password', e.target.value)}
                                        value={createUserData.confirm_password}
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="text"
                                        sizing="md"
                                        required
                                        color={validationErrors.confirm_password ? "failure" : undefined}
                                        helperText={validationErrors.confirm_password && (
                                            <span className="text-red-600 text-sm">
                                                {validationErrors.confirm_password}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="w-full py-1 bg-[#5884C4] hover:bg-[#3062ae] text-white font-medium rounded-md">
                                        Submit
                                    </button>
                                </div>
                                <div className="text-center">

                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>

                    {/* Modal Update */}
                    <Modal show={openModalUpdate} onClose={handleCloseUpdateModal}>
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
                                    <TextInput
                                        value={oneUser.usercode}
                                        id="usercode"
                                        name="usercode"
                                        type="text"
                                        sizing="md"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="username" value="User Name" />
                                    </div>
                                    <TextInput
                                        value={oneUser.username}
                                        onChange={(e) => handleUpdateInputChange('username', e.target.value)}
                                        id="username"
                                        name="username"
                                        type="text"
                                        sizing="md"
                                        color={updateValidationErrors.username ? "failure" : undefined}
                                        helperText={updateValidationErrors.username && (
                                            <span className="text-red-600 text-sm">
                                                {updateValidationErrors.username}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="role" value="Role User" />
                                    </div>
                                    <Select
                                        onChange={(e) => handleUpdateInputChange('role', e.target.value)}
                                        value={oneUser.role}
                                        id="role"
                                        name="role"
                                        color={updateValidationErrors.role ? "failure" : undefined}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value="Password" />
                                    </div>
                                    <TextInput
                                        onChange={(e) => handleUpdateInputChange('password', e.target.value)}
                                        id="password"
                                        name="password"
                                        type="text"
                                        sizing="md"
                                        color={updateValidationErrors.password ? "failure" : undefined}
                                        helperText={updateValidationErrors.password && (
                                            <span className="text-red-600 text-sm">
                                                {updateValidationErrors.password}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="confirm_password" value="Confirm Password" />
                                    </div>
                                    <TextInput
                                        onChange={(e) => handleUpdateInputChange('confirm_password', e.target.value)}
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="text"
                                        sizing="md"
                                        color={updateValidationErrors.confirm_password ? "failure" : undefined}
                                        helperText={updateValidationErrors.confirm_password && (
                                            <span className="text-red-600 text-sm">
                                                {updateValidationErrors.confirm_password}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="w-full py-1 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-md">
                                        {loading ? 'Updating...' : 'Update'}
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