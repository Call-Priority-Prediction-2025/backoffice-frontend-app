
export interface CreateUser {
    usercode: string;
    username: string;
    role: string;
    password: string;
    confirm_password: string;
}

export interface User {
    id: number;
    usercode: string;
    username: string;
    role: string;
    password: string | null;
    confirm_password: string | null;
}