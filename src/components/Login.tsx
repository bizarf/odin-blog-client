import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import JwtDecodeType from "../types/jwt_decode";
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

type Props = {
    fetchUserData: () => void;
};

const Login = ({ fetchUserData }: Props) => {
    const [error, setError] = useState<[ErrorsType] | []>([]);
    // if the success state is true, then the form will disappear and a success message will be displayed to the user
    const [success, setSuccess] = useState<boolean>(false);

    // user object state
    const { user } = useUserStore();

    // initialize universal-cookie
    const cookies = new Cookies();
    const navigate = useNavigate();

    const loginFormSchema = z.object({
        username: z
            .string()
            .email({ message: "Username must be a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
    });

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const sendLogin = async (values: z.infer<typeof loginFormSchema>) => {
        // start fetch api, with a post method and set the header content type to json
        fetch(`${import.meta.env.VITE_API_HOST}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // need to stringify the username and password to be able to send them as JSON objects
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                // data object can either return a token or errors. if we get the token object, then we decode the token and set that as the user state. we store the jwt in the cookie.
                if (data.success) {
                    const decode: JwtDecodeType = jwtDecode(data.token);
                    cookies.set("jwt_auth", data.token, {
                        // multiply the expiration value from the jwt by 1000 to change the value to milliseconds so that it'll become a valid date
                        expires: new Date(decode.exp * 1000),
                    });
                    fetchUserData();
                    setSuccess((state) => !state);
                    setTimeout(() => {
                        navigate("/");
                        navigate(0);
                    }, 500);
                } else if (Array.isArray(data.errors)) {
                    // error messages from express validator go here
                    setError(data.errors);
                } else {
                    // if the error message is an object from passport, then we need to put it in an array
                    setError([data]);
                }
            });
    };

    // if user is already logged in, then send them back to the home page instead of letting them try to log in again
    useEffect(() => {
        if (user && !success) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="mx-auto max-w-xs">
            {!success ? (
                <>
                    <h2 className="py-4 text-center text-2xl font-bold text-gray-800  dark:text-white">
                        Login
                    </h2>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(sendLogin)}
                            className="space-y-3 rounded-xl border border-slate-500 p-4 dark:bg-gray-800"
                        >
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
                                                placeholder="Password"
                                                {...field}
                                                className="dark:bg-slate-900"
                                                maxLength={32}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error.map((error, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="text-sm text-red-600 dark:text-red-500"
                                    >
                                        {error.msg}
                                    </div>
                                );
                            })}
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
                    Login was successful!
                </h2>
            )}
        </div>
    );
};

export default Login;
