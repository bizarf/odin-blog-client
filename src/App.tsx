import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import User from "./types/user";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Post from "./components/Post";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import JwtDecodeType from "./types/jwt_decode";

const App = () => {
    const [theme, setTheme] = useState<string>();
    const [user, setUser] = useState<User | undefined>();

    const cookies = new Cookies();

    const fetchUserData = () => {
        const jwt = cookies.get("jwt_auth");
        const decode: JwtDecodeType = jwtDecode(jwt);

        fetch(
            `https://odin-blog-api-ofv2.onrender.com/api/user/${decode.user}`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    setUser(data.user);
                }
            });
    };

    return (
        // set the app container to a minimum height 100% to allow the div to take up the rest of the space. a must have for the dark mode background colour
        <div className="flex min-h-full flex-col dark:bg-slate-600">
            <HashRouter>
                {/* flex to make a sticky footer */}
                <div className="flex-[1_0_auto]">
                    <Header
                        user={user}
                        setUser={setUser}
                        theme={theme}
                        setTheme={setTheme}
                        fetchUserData={fetchUserData}
                    />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    user={user}
                                    fetchUserData={fetchUserData}
                                />
                            }
                        />
                        <Route
                            path="/sign-up"
                            element={<SignUp user={user} />}
                        />
                        <Route
                            path="/posts/:id"
                            element={<Post user={user} />}
                        />
                    </Routes>
                </div>
                <Footer theme={theme} />
            </HashRouter>
        </div>
    );
};

export default App;
