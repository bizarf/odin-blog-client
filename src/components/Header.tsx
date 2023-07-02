import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import UserType from "../types/user";

type Props = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const Header = ({ user, setUser }: Props) => {
    const cookies = new Cookies();

    const logout = () => {
        // delete the JWT token from the cookie
        setUser(null);
        cookies.remove("jwt_auth");
    };

    useEffect(() => {
        const checkCookie = async () => {
            const jwt = await cookies.get("jwt_auth");
            if (jwt) {
                setUser(jwt);
            }
        };
        checkCookie();
    }, [user]);

    return (
        <header className="sticky top-0 z-50 flex w-full bg-white py-4 text-sm dark:bg-gray-800">
            <nav className="flex w-full flex-row items-center justify-between gap-5 px-5 ">
                <div>BLOG LOGO OR TEXT GOES HERE</div>
                <div className="sm:justify-end">
                    <Link
                        className="inline-flex items-center gap-2 whitespace-nowrap px-1 py-4 text-sm text-blue-500 hover:text-blue-700"
                        to="/"
                    >
                        Home
                    </Link>
                    {!user && (
                        <>
                            <Link
                                className="inline-flex items-center gap-2 whitespace-nowrap px-1 py-4 text-sm text-blue-500 hover:text-blue-700"
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link
                                className="inline-flex items-center gap-2 whitespace-nowrap px-1 py-4 text-sm text-blue-500 hover:text-blue-700"
                                to="/sign-up"
                            >
                                Sign-up
                            </Link>
                        </>
                    )}
                    {user && (
                        <Link
                            className="inline-flex items-center gap-2 whitespace-nowrap px-1 py-4 text-sm text-blue-500 hover:text-blue-700"
                            to="/"
                            onClick={logout}
                        >
                            Logout
                        </Link>
                    )}
                    <button>theme switcher</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
