import { createHashRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Post from "./components/Post";
import SignUp from "./components/SignUp";
import MainLayout from "./components/MainLayout";

type Props = {
    fetchUserData: () => void;
};

const Router = ({ fetchUserData }: Props) => {
    // using hashrouter as Github pages does not support BrowserRouter
    const router = createHashRouter([
        {
            path: "/",
            element: <MainLayout fetchUserData={fetchUserData} />,
            children: [
                // the mainlayout uses an outlet and setting this will make the homepage the default page for that outlet element
                { index: true, element: <Homepage /> },
                {
                    path: "/login",
                    element: <Login fetchUserData={fetchUserData} />,
                },
                {
                    path: "/sign-up",
                    element: <SignUp />,
                },
                {
                    path: "/posts/:id",
                    element: <Post />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
