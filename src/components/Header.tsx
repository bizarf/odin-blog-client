import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../types/user";

type Props = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const Header = ({ user, setUser }: Props) => {
    useEffect(() => {
        console.log();
    }, []);

    return (
        <header className="sticky top-0 z-50 flex w-full bg-white py-4 text-sm dark:bg-gray-800">
            <nav className="flex w-full flex-row items-center justify-between gap-5 px-5 ">
                <div>BLOG LOGO OR TEXT GOES HERE</div>
                <div className="sm:justify-end">
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
                </div>
            </nav>
        </header>
    );
};

export default Header;
