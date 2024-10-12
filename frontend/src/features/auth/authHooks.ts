import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {LoginRequest, LoginResponse} from "@/types/authTypes.ts";
import {login} from "@/features/auth/authService.ts";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, LoginRequest>(login, {
        onSuccess: (data) => {
            console.log('token', data.token);
            localStorage.setItem('token', data.token);

            navigate('/dashboard');
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
};