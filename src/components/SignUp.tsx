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
        <div>
            {!success ? (
                <form onSubmit={(e) => sendSignUp(e)}>
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <label htmlFor="username">Username:</label>
                    <input
                        type="email"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                    {/* error messages go here */}
                    {error.map((errors, index) => (
                        <div key={index}>{errors.msg}</div>
                    ))}
                </form>
            ) : (
                <h3>Sign up was successful!</h3>
            )}
        </div>
    );
};

export default SignUp;
