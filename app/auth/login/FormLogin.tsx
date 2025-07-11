"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Typography } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

type LoginData = {
    email: string;
    password: string;
};

export default function FormLogin() {
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>();

    const onSubmit = (data: LoginData) => {
        console.log("Login:", data);
        router.push("/");
    };

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
            }}
        >
            <div style={{ width: "100%", maxWidth: 400 }}>
                <Title level={3} style={{ marginBottom: "1.5rem" }}>
                    Iniciar Sesión
                </Title>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item
                        label="Correo electrónico"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Correo no válido",
                                },
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder="email@dominio.com" />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password?.message}
                    >
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres",
                                },
                            }}
                            render={({ field }) => (
                                <Input.Password {...field} placeholder="••••••" />
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={isSubmitting}
                        >
                            Iniciar Sesión
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
                        <Text>
                            ¿No tienes cuenta?{" "}
                            <Link href="/register" style={{ color: "#1677ff" }}>
                                Regístrate
                            </Link>
                        </Text>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
