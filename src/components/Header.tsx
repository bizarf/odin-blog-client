import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import useThemeStore from "../stores/useThemeStore";
import useUserStore from "../stores/useUserStore";

type Props = {
    fetchUserData: () => void;
};

const Header = ({ fetchUserData }: Props) => {
    // theme state and setter
    const { theme, setTheme } = useThemeStore();
    // user object state and setter
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const pageTheme = localStorage.getItem("theme") || "light";
        setTheme(pageTheme);
    }, []);

    useEffect(() => {
        const handleThemeChange = () => {
            const htmlElement = document.querySelector("html");

            if (theme === "light") {
                htmlElement?.classList.remove("dark");
                localStorage.setItem("theme", "light");
            } else if (theme === "dark") {
                htmlElement?.classList.add("dark");
                localStorage.setItem("theme", "dark");
            }
        };
        handleThemeChange();
    }, [theme]);

    const cookies = new Cookies();

    const logout = () => {
        // delete the JWT token from the cookie
        setUser(undefined);
        cookies.remove("jwt_auth");
    };

    useEffect(() => {
        const checkCookie = async () => {
            const jwt = await cookies.get("jwt_auth");
            if (jwt) {
                fetchUserData();
            }
        };
        checkCookie();
    }, []);

    return (
        <header className="sticky top-0 z-50 flex w-full border-b-2 bg-white py-4 text-sm dark:border-b-0 dark:bg-gray-800">
            <nav className="flex w-full flex-row items-center justify-between gap-5 px-5 ">
                <Link
                    className="whitespace-nowrap text-xl text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                    to="/"
                >
                    Odin Blog
                </Link>
                <div className="inline-flex">
                    <Link
                        className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                        to="/"
                    >
                        Home
                    </Link>
                    {!user && (
                        <>
                            <Link
                                className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link
                                className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                                to="/sign-up"
                            >
                                Sign-up
                            </Link>
                        </>
                    )}
                    {user && (
                        <Link
                            className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                            to="/"
                            onClick={logout}
                        >
                            Logout
                        </Link>
                    )}
                    {/* dark mode button toggle */}
                    {theme === "light" && (
                        <button
                            className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                            aria-label="Turn on dark mode"
                            onClick={() => setTheme("dark")}
                        >
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                            </svg>
                        </button>
                    )}
                    {theme === "dark" && (
                        <button
                            className="whitespace-nowrap px-2 text-sm text-slate-700 hover:text-slate-950 dark:text-white dark:hover:text-slate-200"
                            aria-label="Turn on light mode"
                            onClick={() => setTheme("light")}
                        >
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                            </svg>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
