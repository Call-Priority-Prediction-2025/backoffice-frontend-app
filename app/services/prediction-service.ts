import API_BASE_URL from "../config/api"
import Cookies from "js-cookie";
import CustomError from "@/app/custom-error"

let token_from_cookies = Cookies.get("token")

export async function getModels() {
    try {
        let token_from_cookies = Cookies.get("token")
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

export async function submitPredictionReview(data: FormData) {
    try {
        let token_from_cookies = Cookies.get("token")
        const fetchPrediction = await fetch(API_BASE_URL + "/api/prediction/review", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token_from_cookies}`
            },
            body: data
        })

        const dataPrediction = await fetchPrediction.json();
        if (dataPrediction?.error) {
            throw new CustomError(dataPrediction.error.message, fetchPrediction.status)
        }

        console.log("data: ", dataPrediction)

        return dataPrediction;
    } catch (error: any) {
        if (error instanceof CustomError) {
            throw error
        } else {
            throw new Error(error.message)
        }
    }
}

export async function predictModelCompare(data: FormData) {
    try {
        let token_from_cookies = Cookies.get("token")
        const fetchPredictionCompare = await fetch(API_BASE_URL + "/api/prediction/compare", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token_from_cookies}`
            },
            body: data
        })

        const dataPredictionCompare = await fetchPredictionCompare.json();
        if (dataPredictionCompare?.error) {
            throw new CustomError(dataPredictionCompare.error.message, fetchPredictionCompare.status)
        }

        console.log("data: ", dataPredictionCompare)
        
        return dataPredictionCompare;
    } catch (error: any) {
        if (error instanceof CustomError) {
            throw error
        } else {
            throw new Error(error.message)
        }
    }
}

export async function submitPrediction(data: FormData) {
    try {
        let token_from_cookies = Cookies.get("token")
        const fetchPrediction = await fetch(API_BASE_URL + "/api/prediction", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token_from_cookies}`
            },
            body: data
        })

        const dataPrediction = await fetchPrediction.json();

        if (dataPrediction?.error) {
            throw new Error(dataPrediction.error.message)
        }

        return dataPrediction;
    } catch (error: any) {
        throw new Error(error.message);
    }
}