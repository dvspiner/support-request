import {LoginRequest, LoginResponse} from "@/types/authTypes.ts";
import axiosInstance from "@/lib/axiosInstance.ts";


export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(`auth/login`, data);
    return response.data;
};
