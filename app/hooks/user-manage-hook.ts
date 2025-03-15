'use client'

import { useEffect, useState } from "react"
import { getUsers } from "../services/user-manage-service"

export function useUsers() {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            const result = await getUsers();
            setData(result.data);
        } catch (error: any) {
            setError(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        fetchData()
    }

    return { data, error, refetch }
}