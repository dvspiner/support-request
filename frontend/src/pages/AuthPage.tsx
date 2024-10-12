import React from 'react';
import {useForm} from 'react-hook-form';
import AuthLayout from '../layouts/AuthLayout';
import {LoginRequest} from '../types/authTypes';
import {Button} from '@/components/button';
import {Label} from "@/components/label.tsx";
import {Input} from "@/components/input.tsx";
import {useLogin} from "@/features/auth/authHooks.ts";

const AuthPage: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginRequest>();
    const mutation = useLogin();


    const onSubmit = (data: LoginRequest) => {
        mutation.mutate(data);
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        {...register('email', {required: 'Email is required'})}
                        className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        {...register('password', {required: 'Password is required'})}
                        className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Loading...' : 'Login'}
                </Button>

                {mutation.isError && (
                    <p className="text-red-500 text-sm">Login failed. Please try again.</p>
                )}
            </form>
        </AuthLayout>
    );
};

export default AuthPage;