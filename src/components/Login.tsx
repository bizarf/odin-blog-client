import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import JwtDecodeType from "../types/jwt_decode";
import UserType from "../types/user";
import ErrorsType from "../types/errors";

type Props = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const Login = ({ user, setUser }: Props) => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<[ErrorsType] | []>([]);
    // if the success state is true, then the form will disappear and a success message will be displayed to the user
    const [success, setSuccess] = useState<boolean>(false);

    // initialize universal-cookie
    const cookies = new Cookies();
    const navigate = useNavigate();

    const sendLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // make an object with the username and password input states
        const data = { username, password };

        // start fetch api, with a post method and set the header content type to json
        fetch("https://odin-blog-api-ofv2.onrender.com/api/login", {
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
                if (data.token) {
                    const decode: JwtDecodeType = jwtDecode(data.token);
                    setUser(decode.user);
                    cookies.set("jwt_auth", data.token, {
                        // multiply the expiration value from the jwt by 1000 to change the value to milliseconds so that it'll become a valid date
                        expires: new Date(decode.exp * 1000),
                    });
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

    // if user is already logged in, then send them back to the home page instead of letting them try to log in again
    useEffect(() => {
        if (user && !success) {
            navigate("/");
        }
    });

    return (
        <div>
            {!success ? (
                <form onSubmit={(e) => sendLogin(e)}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="email"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                    {/* error messages go here */}
                    {error.map((errors, index) => (
                        <div key={index}>{errors.msg}</div>
                    ))}
                </form>
            ) : (
                <h3>Login was successful!</h3>
            )}
        </div>
    );
};

export default Login;
