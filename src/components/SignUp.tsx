import React, { useEffect, useState } from "react";
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
    // const [firstname, setFirstname] = useState<string>();
    // const [lastname, setLastname] = useState<string>();
    // const [username, setUsername] = useState<string>();
    // const [password, setPassword] = useState<string>();
    // const [confirmPassword, setConfirmPassword] = useState<string>();
    const [error, setError] = useState<[ErrorsType] | []>([]);
    // if the success state is true, then the form will disappear and a success message will be displayed to the user
    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    // user object state
    const { user } = useUserStore();

    const signUpFormSchema = z.object({
        firstname: z.string().min(1, { message: "First name is required" }),
        lastname: z.string().min(1, { message: "Last name is required" }),
        username: z.string().min(1, { message: "Username is required" }),
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

    // const sendSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    const sendSignUp = async (values: z.infer<typeof signUpFormSchema>) => {
        console.log(values);
        if (values.password !== values.confirmPassword) {
            form.resetField("password");
            form.resetField("confirmPassword");
            return setError([
                {
                    location: "",
                    path: "",
                    type: "",
                    value: "",
                    msg: "Passwords do not match",
                },
            ]);
        }
        // e.preventDefault();
        // make an object with the sign up detail states
        // const data = {
        //     firstname,
        //     lastname,
        //     username,
        //     password,
        //     confirmPassword,
        // };
        // // start fetch api, with a post method and set the header content type to json
        // fetch("https://odin-blog-api-ofv2.onrender.com/api/sign-up", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     // need to stringify the username and password to be able to send them as JSON objects
        //     body: JSON.stringify(data),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         // data object can either return a token or errors. if we get the token object, then we decode the token and set that as the user state. we store the jwt in the cookie.
        //         if (data.message === "Sign up was successful!") {
        //             // some sort of way to show sign up successful message
        //             setSuccess((state) => !state);
        //             setTimeout(() => {
        //                 navigate("/");
        //             }, 5000);
        //         } else {
        //             // error messages go here
        //             setError(data.errors);
        //             console.log(error);
        //         }
        //     });
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
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Username"
                                                {...field}
                                                className="dark:bg-slate-900"
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
                                                placeholder="Password"
                                                {...field}
                                                className="dark:bg-slate-900"
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
                                                placeholder="Confirm Password"
                                                {...field}
                                                className="dark:bg-slate-900"
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
