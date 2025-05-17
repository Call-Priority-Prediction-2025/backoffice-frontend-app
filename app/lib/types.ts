
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

export interface ResultPredict {
    id: string;
    start_time: string;
    cust_name: string;
    age: number;
    city_domicile: string;
    occupation: string;
    marital_status: string;
    monthly_salary: number;
    depend_child: number;
    tenor: number;
    probability_rejected_call: number;
}

export interface ReviewResultPredict {
    total_data: number;
    total_correct: number;
    total_wrong: number;
    total_data_label_1: number;
    total_correct_label_1: number;
    total_wrong_label_1: number;
    total_data_label_0: number;
    total_correct_label_0: number;
    total_wrong_label_0: number;
}

export interface ModelPredictsInAutoChoose {
    id: number;
    file_model_name: string;
    result_score: number;
    is_done: boolean // default false
}

export interface JwtPayload {
    user_id: number;
    username: string;
    user_role: string;
}
