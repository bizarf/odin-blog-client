import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import User from "./types/user";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Post from "./components/Post";

const App = () => {
    const [user, setUser] = useState<User>();

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Homepage user={user} setUser={setUser} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<Login />} />
                    <Route path="/posts/:id" element={<Post />} />
                </Routes>
            </HashRouter>
        </>
    );
};

export default App;
