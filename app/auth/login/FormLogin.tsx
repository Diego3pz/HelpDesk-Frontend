"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoginData = {
    email: string;
    password: string;
};

export default function FormLogin() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginData>();

    const onSubmit = (data: LoginData) => {
        console.log("Login:", data);
        router.push("/");
    };

    return (
        <>
        </>
    );
}