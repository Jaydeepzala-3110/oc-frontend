"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { signinSchema, type SigninFormData } from "@/lib/validations/auth"
import { useSignin } from "@/hooks/useAuth"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [identifier, setIdentifier] = React.useState<string>('')

    const signinMutation = useSignin()

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<SigninFormData>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: undefined,
            phoneNumber: undefined,
            password: "",
        },
    })


    const isEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
    const isPhoneNumber = (str: string) => /^\+?[1-9]\d{1,14}$/.test(str.replace(/\s+/g, ''));

    const parseIdentifier = (value: string) => {
        const clean = value.trim();
        if (isEmail(clean)) {
            return { email: clean.toLowerCase(), phoneNumber: undefined };
        } else {
            return { email: undefined, phoneNumber: clean };
        }
    };

    const onSubmit = async (data: SigninFormData) => {
        if (!identifier.trim()) {
            setError("email", { message: "Email or phone number is required" });
            return;
        }

        clearErrors(["email", "password"]);

        const { email, phoneNumber } = parseIdentifier(identifier);

        const payload: {
            email?: string;
            phoneNumber?: string;
            password: string;
        } = {
            password: data.password,
        };

        if (email) payload.email = email;
        if (phoneNumber) payload.phoneNumber = phoneNumber;

        signinMutation.mutate(payload);
    };

    const isLoading = isSubmitting || signinMutation.isPending

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>
                    Enter your credentials to login
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="email-or-phone">
                            Email or Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder="you@example.com or +1234567890"
                            disabled={isLoading}
                            value={identifier}
                            onChange={(e) => {
                                const val = e.target.value;
                                setIdentifier(val);

                                const { email, phoneNumber } = parseIdentifier(val);
                                setValue("email", email, { shouldValidate: true });
                                setValue("phoneNumber", phoneNumber, { shouldValidate: true });

                                if (errors.email) clearErrors("email");
                            }}
                            aria-invalid={!!errors.email}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                disabled={isLoading}
                                {...register("password")}
                                aria-invalid={errors.password ? "true" : "false"}
                                className={errors.password ? "border-destructive pr-10" : "pr-10"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-destructive" role="alert">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Login..." : "Login"}
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-primary underline-offset-4 hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}

