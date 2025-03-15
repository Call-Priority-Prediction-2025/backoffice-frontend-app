'use client'

import { useEffect, useState } from "react";
import { getModelPredictors, getOneModelPredictor } from "../services/model-manage-service";

export function useModelPredictors() {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            const result = await getModelPredictors();
            setData(result.data);
        } catch (error: any) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        fetchData()
    }

    return { data, error, refetch };
}