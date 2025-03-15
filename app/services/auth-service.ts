import API_BASE_URL from "../config/api"

export async function submitSignIn(data: { userCode: string, password: string }) {
    try {
        const fetchSignIn = await fetch(API_BASE_URL + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usercode: data.userCode,
                password: data.password
            })
        })

        const dataSignIn = await fetchSignIn.json();

        if (dataSignIn?.error) {
            throw new Error(dataSignIn.error.message)
        }

        return dataSignIn;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function verifyToken(token: string) {
    try {
        const fetchVerifyToken = await fetch(API_BASE_URL + "/api/verify-token", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const dataVerifyToken = await fetchVerifyToken.json();

        if (dataVerifyToken?.error) {
            throw new Error(dataVerifyToken.error.message)
        }

        return dataVerifyToken;
    } catch (error: any) {
        throw new Error(error.message);
    }
}