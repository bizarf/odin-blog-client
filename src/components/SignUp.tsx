import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorsType from "../types/errors";
import useUserStore from "../stores/useUserStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignUp = () => {
    const [error, setError] = useState<[ErrorsType] | []>([]);
    // if the success state is true, then the form will disappear and a success message will be displayed to the user
    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    // user object state
    const { user } = useUserStore();

    const signUpFormSchema = z.object({
        firstname: z
            .string()
            .min(2, {
                message: "First name must be at least 2 characters long",
            })
            .regex(/^[a-zA-Z]+$/, {
                message: "First name can only contain letters",
            }),
        lastname: z
            .string()
            .min(2, { message: "Last name must be at least 2 characters long" })
            .regex(/^[a-zA-Z]+$/, {
                message: "Last name can only contain letters",
            }),
        username: z
            .string()
            .email({ message: "Username must be a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
    });

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const sendSignUp = async (values: z.infer<typeof signUpFormSchema>) => {
        // clear the errors if there is one already there
        setError([]);

        // if the password and confirm password do not match, then return an error
        if (values.password !== values.confirmPassword) {
            form.resetField("password");
            form.resetField("confirmPassword");
            setError([
                {
                    location: "",
                    path: "",
                    type: "",
                    value: "",
                    msg: "Passwords do not match",
                },
            ]);
            return setTimeout(() => {
                setError([]);
            }, 5000);
        }

        // start fetch api, with a post method and set the header content type to json
        fetch(`${import.meta.env.VITE_API_HOST}/api/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // need to stringify the values object to be able to send them as a JSON payload
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                // data object can either return a token or errors. if we get the token object, then we decode the token and set that as the user state. we store the jwt in the cookie.
                if (data.message === "Sign up was successful!") {
                    // some sort of way to show sign up successful message
                    setSuccess((state) => !state);
                    setTimeout(() => {
                        navigate("/");
                    }, 5000);
                } else {
                    // error messages go here
                    setError(data.errors);
                    console.log(error);
                    return setTimeout(() => {
                        setError([]);
                    }, 5000);
                }
            });
    };

    // if user is already logged in, then send them back to the home page instead of letting them try to sign up again
    useEffect(() => {
        if (user && !success) {
            navigate("/");
        }
    });

    return (
        <div className="mx-auto flex w-full max-w-sm flex-col">
            {!success ? (
                <>
                    <h2 className="py-4 text-center text-2xl font-bold text-gray-800  dark:text-white">
                        Sign Up
                    </h2>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(sendSignUp)}
                            className="space-y-3 mb-4 rounded-xl border border-slate-500 p-4 dark:bg-gray-800"
                        >
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="First Name"
                                                {...field}
                                                className="dark:bg-slate-900"
                                                maxLength={32}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Last Name"
                                                {...field}
                                                className="dark:bg-slate-900"
                                                maxLength={32}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username (E-mail)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Username (E-mail)"
                                                {...field}
                                                className="dark:bg-slate-900"
                                                maxLength={255}
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                                className="dark:bg-slate-900"
                                                maxLength={32}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm Password"
                                                {...field}
                                                className="dark:bg-slate-900"
                                                maxLength={32}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600" />
                                    </FormItem>
                                )}
                            />
                            {Array.isArray(error) ? (
                                error.map((error, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className="text-sm text-red-600 dark:text-red-500"
                                        >
                                            {error.msg}
                                        </span>
                                    );
                                })
                            ) : (
                                <div className="text-sm text-red-600 dark:text-red-500">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-blue-500 dark:text-white"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </>
            ) : (
                <h2 className="py-4 text-center text-2xl font-bold text-gray-800  dark:text-white">
                    Sign up was successful!
                </h2>
            )}
        </div>
    );
};

export default SignUp;
