import API_BASE_URL from "../config/api"
import Cookies from "js-cookie";
import CustomError from "@/app/custom-error"
import { CreateUser, User } from "../lib/types";
import ErrorWithDetail from "../lib/errors";

let token_from_cookies = Cookies.get("token")

export async function getUsers() {
    try {
        const fetchUsers = await fetch(API_BASE_URL + '/api/user-manage/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token_from_cookies}`
            }
        })

        const resultResponse = await fetchUsers.json();

        if (resultResponse?.error) {
            throw new Error(resultResponse.error.message);
        }

        return resultResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getOneUser(id: number) {
    try {
        const fetchOneUser = await fetch(API_BASE_URL + `/api/user-manage/${id}/detail-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token_from_cookies}`
            }
        })

        const resultResponse = await fetchOneUser.json();

        if (resultResponse?.error) {
            throw new Error(resultResponse.error.message);
        }

        return resultResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createUser(data: CreateUser) {
    try {
        const fetchCreateUser = await fetch(API_BASE_URL + '/api/user-manage/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token_from_cookies}`
            },
            body: JSON.stringify(data)
        })

        const resultResponse = await fetchCreateUser.json();

        if (resultResponse?.error) {
            throw new Error(resultResponse.error.message)
        }

        if (fetchCreateUser.status === 422) {
            throw new ErrorWithDetail('validation error', resultResponse.detail);
        }

        return resultResponse;
    } catch (error: any) {
        throw error;
    }
}

export async function updateUser(id: number, data: User) {
    try {
        const fetchUpdateUser = await fetch(API_BASE_URL + `/api/user-manage/${id}/update-user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token_from_cookies}`
            },
            body: JSON.stringify(data)
        })

        const resultResponse = await fetchUpdateUser.json();


        if (resultResponse?.error) {
            throw new Error(resultResponse.error.message)
        }

        if (fetchUpdateUser.status === 422) {
            throw new ErrorWithDetail('validation error', resultResponse.detail);
        }

        return resultResponse;
    } catch (error: any) {
        throw error;
    }
}

export async function deleteUser(id: number) {
    try {
        const fetchDeleteUser = await fetch(API_BASE_URL + `/api/user-manage/${id}/delete-user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token_from_cookies}`
            },
        })

        const resultResponse = await fetchDeleteUser.json();

        if (resultResponse?.error) {
            throw new Error(resultResponse.error.message)
        }

        return resultResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}