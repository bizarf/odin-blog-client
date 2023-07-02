import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import User from "./types/user";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Post from "./components/Post";
import SignUp from "./components/SignUp";
import Header from "./components/Header";

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <>
            <HashRouter>
                <Header user={user} setUser={setUser} />
                <Routes>
                    <Route
                        path="/"
                        element={<Homepage user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/login"
                        element={<Login user={user} setUser={setUser} />}
                    />
                    <Route path="/sign-up" element={<SignUp user={user} />} />
                    <Route
                        path="/posts/:id"
                        element={<Post user={user} setUser={setUser} />}
                    />
                </Routes>
            </HashRouter>
        </>
    );
};

export default App;
