import { waitFor, render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { HashRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header, { logout } from "../src/components/Header";
import userEvent from "@testing-library/user-event";
import User from "../src/types/user";
import Homepage from "../src/components/Homepage";

const mockUser = {
    _id: "64f89f20e9476b3f083b9a2f",
    firstname: "John",
    lastname: "Doe",
    isAuthor: true,
    username: "john@doe.com",
    password: "password",
};

describe("header test", () => {
    it("header renders", async () => {
        render(
            <Header
                user={undefined}
                setUser={vi.fn()}
                theme={undefined}
                setTheme={vi.fn()}
                fetchUserData={vi.fn()}
            />,
            { wrapper: HashRouter }
        );
        expect(
            screen.getByRole("link", { name: "Odin Blog" })
        ).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Sign-up" })
        ).toBeInTheDocument();
    });

    it("header displays logout link if the user is logged in", () => {
        render(
            <Header
                user={mockUser}
                setUser={vi.fn()}
                theme={undefined}
                setTheme={vi.fn()}
                fetchUserData={vi.fn()}
            />,
            { wrapper: HashRouter }
        );
        expect(
            screen.getByRole("link", { name: "Odin Blog" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Logout" })
        ).toBeInTheDocument();
    });

    // not sure how to fix this test
    // it("header doesn't display logout after user is logged out", async () => {
    //     const user = userEvent.setup();
    //     render(
    //         <MemoryRouter>
    //             <Header
    //                 user={mockUser}
    //                 setUser={vi.fn()}
    //                 theme={undefined}
    //                 setTheme={vi.fn()}
    //                 fetchUserData={vi.fn()}
    //             />
    //             <Routes>
    //                 <Route path="/" element={<Homepage />} />
    //             </Routes>
    //         </MemoryRouter>
    //     );
    //     expect(
    //         screen.getByRole("link", { name: "Odin Blog" })
    //     ).toBeInTheDocument();
    //     expect(
    //         screen.getByRole("link", { name: "Logout" })
    //     ).toBeInTheDocument();
    //     await user.click(screen.getByRole("link", { name: "Logout" }));
    //     await waitFor(() => {
    //         expect(
    //             screen.getByRole("link", { name: "Logout" })
    //         ).not.toBeInTheDocument();
    //     });
    // expect(
    //     screen.getByRole("link", { name: "Logout" })
    // ).not.toBeInTheDocument();
    // });
});
