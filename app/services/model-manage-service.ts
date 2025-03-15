import API_BASE_URL from "../config/api"
import Cookies from "js-cookie";
import CustomError from "@/app/custom-error"

let token_from_cookies = Cookies.get("token");

export async function getModelPredictors() {
    try {
        const response = await fetch(API_BASE_URL + "/api/model-manage/models", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token_from_cookies}`
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Failed get model predictors");
    }
}

export async function getOneModelPredictor(id: number) {
    try {
        const response = await fetch(API_BASE_URL + `/api/model-manage/${id}/get-model`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token_from_cookies}`
            }
        })

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Failed get model predictor");
    }
}

export async function submitNewFileModel(data: FormData) {
    try {
        const fetchSubmitFile = await fetch(API_BASE_URL + "/api/model-manage/add-model", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token_from_cookies}`
            },
            body: data
        })

        const responseSubmitFile = await fetchSubmitFile.json();

        if (responseSubmitFile?.error) {
            throw new Error(responseSubmitFile.error.message)
        }

        return responseSubmitFile;
    } catch (error: any) {
        throw new Error(error.message);
    }

}

export async function submitUpdateFileModel(data: FormData, id: number) {
    try {
        const fetchSubmitUpdateFile = await fetch(API_BASE_URL + `/api/model-manage/${id}/update-model`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token_from_cookies}`
            },
            body: data
        })

        const responseSubmitUpdateFile = await fetchSubmitUpdateFile.json();

        if (responseSubmitUpdateFile?.error) {
            throw new Error(responseSubmitUpdateFile.error.message)
        }

        return responseSubmitUpdateFile;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteModelPredictor(id: number) {
    try {
        const fetchDeleteFile = await fetch(API_BASE_URL + `/api/model-manage/${id}/delete-model`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token_from_cookies}`
            },
        })

        const responseDeleteFile = await fetchDeleteFile.json();

        if (responseDeleteFile?.error) {
            throw new Error(responseDeleteFile.error.message)
        }

        return responseDeleteFile;
    } catch (error: any) {
        throw new Error(error.message);
    }
}