"use client"

import { useEffect, useState, ComponentType, JSX } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/app/lib/types";

export default function WithAuth<P extends JSX.IntrinsicAttributes = {}>(WrappedComponent: ComponentType<P>, allowedRole: string[]) {
    const AuthenticatedComponent = (props: P) => {
        const router = useRouter();
        const [loading, setLoading] = useState<boolean>(true);

        useEffect(() => {
            const token = Cookies.get("token");
            if (!token) {
                router.push("/auth/sign-in");
                return;
            }

            try {
                const decodedToken = jwtDecode<JwtPayload>(token);
                const userRole = decodedToken.user_role;

                if (!allowedRole.includes(userRole)) {
                    router.push("/dashboard/prediction")
                    return;
                }

            } catch (error) {
                console.error("Invalid token:", error);
                router.push('/auth/sign-in');
                return;
            }

            setLoading(false);
        }, [router, allowedRole])

        if (loading) {
            return <div>Loading...</div>
        }

        return <WrappedComponent {...props} />
    }

    return AuthenticatedComponent;
}