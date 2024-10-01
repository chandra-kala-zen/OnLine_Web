'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Input } from "@/components/ui/input"; // Shadcn Input
import { Card } from "@/components/ui/card"; // Shadcn Card
import { useForm } from "react-hook-form"; // For form management
import { z } from "zod"; // For validation schema
import { zodResolver } from "@hookform/resolvers/zod"; // For Zod integration
import { Typography } from "@/components/ui/typography";

// Validation schema
const registrationSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof registrationSchema>;

function Register() {
    const [serverError, setServerError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = async (data: FormData) => {
        setServerError("");
        setSuccess("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.status === 400) {
                setServerError("This email is already registered.");
            } else if (res.status === 201) {
                setSuccess("User created successfully!");
                setTimeout(() => {
                    router.push("/login");
                }, 2000); // Wait 2 seconds before redirecting
            } else {
                setServerError("Failed to create an account. Please try again.");
            }
        } catch (error) {
            setServerError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#212121]">
            <Card className="w-[400px] p-6 ">
                <Typography variant="h1" className="text-center font-bold text-gray-400 mb-4">Register</Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <Input
                        type="text"
                        placeholder="Email"
                        
                        {...register("email")} // Register email input with validation
                        className={`p-2 bg-white px-3 py-3 f border rounded ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>} {/* Email error message */}

                    <Input
                        type="password"
                        placeholder="Password"
                        {...register("password")} // Register password input with validation
                        className={`p-2 bg-white border px-3 py-3 mb-4 frounded ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>} {/* Password error message */}

                    <Button type="submit" className="bg-blue-800  hover:bg-blue-600 py-3 text-white">
                        Submit
                    </Button>
                    {serverError && <p className="text-red-500">{serverError}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <Link className="text-blue-400 hover:text-orange-400 text-center" href="/login">
                        Login into existing account
                    </Link>
                </form>
            </Card>
        </div>
    );
}

export default Register;
