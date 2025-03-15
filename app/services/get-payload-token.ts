
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export default function getPayloadToken() {
    const token = Cookies.get("token");

    if (!token) {
        return null
    } else {
        const payload: { user_id: number, username: string } = jwtDecode(token);

        return { user_id: payload.user_id, username: payload.username }
    }
}