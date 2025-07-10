"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";

type RegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function FormRegister() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<RegisterData>();

    const onSubmit = (data: RegisterData) => {
        console.log("Registro:", data);
    };

    const password = watch("password", "");

    return (
        <></>
    );
}