import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorsType from "../types/errors";
import UserType from "../types/user";

type Props = {
    user: UserType | null;
};

const SignUp = ({ user }: Props) => {
    const [firstname, setFirstname] = useState<string>();
    const [lastname, setLastname] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [error, setError] = useState<[ErrorsType] | []>([]);
    // if the success state is true, then the form will disappear and a success message will be displayed to the user
    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    const sendSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // make an object with the sign up detail states
        const data = {
            firstname,
            lastname,
            username,
            password,
            confirmPassword,
        };

        // start fetch api, with a post method and set the header content type to json
        fetch("https://odin-blog-api-ofv2.onrender.com/api/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // need to stringify the username and password to be able to send them as JSON objects
            body: JSON.stringify(data),
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
        <div className="mx-auto flex w-full max-w-sm flex-col dark:bg-slate-600">
            {!success ? (
                <>
                    <h2 className="py-4 text-center text-2xl font-bold text-gray-800  dark:text-white">
                        Sign Up
                    </h2>
                    <form
                        onSubmit={(e) => sendSignUp(e)}
                        className="mb-4 rounded-xl border border-slate-500 p-4 dark:bg-gray-800"
                    >
                        <label
                            htmlFor="firstname"
                            className="mb-2 block font-semibold dark:text-white"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            className="block w-full rounded-md border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                        />
                        {error.map((error, index) => {
                            if (error.path === "firstname") {
                                return (
                                    <div
                                        key={index}
                                        className="text-sm text-red-600"
                                    >
                                        {error.msg}
                                    </div>
                                );
                            }
                        })}
                        <label
                            htmlFor="lastname"
                            className="mb-2 mt-5 block font-semibold dark:text-white"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            onChange={(e) => setLastname(e.target.value)}
                            className="block w-full rounded-md border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                        />
                        {error.map((error, index) => {
                            if (error.path === "lastname") {
                                return (
                                    <div
                                        key={index}
                                        className="text-sm text-red-600"
                                    >
                                        {error.msg}
                                    </div>
                                );
                            }
                        })}
                        <label
                            htmlFor="username"
                            className="mb-2 mt-5 block font-semibold dark:text-white"
                        >
                            Username
                        </label>
                        <input
                            type="email"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full rounded-md border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                        />
                        {error.map((error, index) => {
                            if (error.path === "username") {
                                return (
                                    <div
                                        key={index}
                                        className="text-sm text-red-600"
                                    >
                                        {error.msg}
                                    </div>
                                );
                            }
                        })}
                        <label
                            htmlFor="password"
                            className="mb-2 mt-5 block font-semibold dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                        />
                        {error.map((error, index) => {
                            if (error.path === "password") {
                                return (
                                    <div
                                        key={index}
                                        className="text-sm text-red-600"
                                    >
                                        {error.msg}
                                    </div>
                                );
                            }
                        })}
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 mt-5 block font-semibold dark:text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full rounded-md border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                        />
                        {Array.isArray(error) ? (
                            error.map((error, index) => {
                                if (error.path === "confirmPassword") {
                                    return (
                                        <div
                                            key={index}
                                            className="text-sm text-red-600"
                                        >
                                            {error.msg}
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <div className="text-sm text-red-600">{error}</div>
                        )}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="mt-3 rounded-md border border-transparent bg-blue-600 px-10 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-offset-gray-800"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
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
