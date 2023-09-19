import { createHashRouter, RouterProvider } from "react-router-dom";
import UserType from "./types/user";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Post from "./components/Post";
import SignUp from "./components/SignUp";
import MainLayout from "./components/MainLayout";

type Props = {
    user: UserType | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
    theme: string | undefined;
    setTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
    fetchUserData: () => void;
};

const Router = ({ user, setUser, theme, setTheme, fetchUserData }: Props) => {
    // using hashrouter as Github pages does not support BrowserRouter
    const router = createHashRouter([
        {
            path: "/",
            element: (
                <MainLayout
                    user={user}
                    setUser={setUser}
                    theme={theme}
                    setTheme={setTheme}
                    fetchUserData={fetchUserData}
                />
            ),
            children: [
                // the mainlayout uses an outlet and setting this will make the homepage the default page for that outlet element
                { index: true, element: <Homepage /> },
                {
                    path: "/login",
                    element: (
                        <Login user={user} fetchUserData={fetchUserData} />
                    ),
                },
                {
                    path: "/sign-up",
                    element: <SignUp user={user} />,
                },
                {
                    path: "/posts/:id",
                    element: <Post user={user} />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
