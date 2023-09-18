import { waitFor, render, screen, act } from "@testing-library/react";
import React from "react";
import { Routes, Route, MemoryRouter, useParams } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import "./setup";
import userEvent from "@testing-library/user-event";
import Post from "../src/components/Post";
import Header from "../src/components/Header";
import Homepage from "../src/components/Homepage";

const mockUser = {
    _id: "64f89f20e9476b3f083b9a2f",
    firstname: "John",
    lastname: "Doe",
    isAuthor: true,
    username: "john@doe.com",
    password: "password",
};

// const mockUser = vi.hoisted(() => {
//     return {
//         _id: "64f89f20e9476b3f083b9a2f",
//         firstname: "John",
//         lastname: "Doe",
//         isAuthor: true,
//         username: "john@doe.com",
//         password: "password",
//     };
// });

// vi.mock("../src/App", async () => {
//     const actual = (await vi.importActual("../src/App")) as typeof App;
//     return {
//         ...actual,
//         user: mockUser,
//     };
// });

vi.mock("react-router-dom", async () => {
    const actual = (await vi.importActual(
        "react-router-dom"
    )) as typeof useParams;
    return {
        ...actual,
        useParams: () => ({
            id: "64f7a382801d417e9755e382",
        }),
    };
});

// describe("comment test", () => {
//     it("user posts comment", async () => {
//         const user = userEvent.setup();

//         render(
//             <MemoryRouter>
//                 <Header
//                     user={mockUser}
//                     setUser={vi.fn()}
//                     theme={undefined}
//                     setTheme={vi.fn()}
//                     fetchUserData={vi.fn()}
//                 />
//                 <Routes>
//                     <Route path="/" element={<Homepage />} />
//                     <Route
//                         path="/posts/:id"
//                         element={<Post user={mockUser} />}
//                     />
//                 </Routes>
//             </MemoryRouter>
//         );
//         // wait for the posts to render
//         await waitFor(() =>
//             expect(
//                 screen.getByText("This is a test blog post")
//             ).toBeInTheDocument()
//         );
//         user.click(screen.getByText("This is a test blog post"));
//         // wait for the post page to render
//         await waitFor(() =>
//             expect(screen.getByRole("heading", { name: "Comments" }))
//         );
//         const textbox = screen.getByPlaceholderText(
//             "Share your thoughts on this article"
//         );
//         await user.type(textbox, "This is a test comment");
//         await user.click(screen.getByRole("button", { name: "Submit" }));
//         expect(screen.getByText("This is a test comment"));
//     });

//     it("user fails to post a comment", async () => {
//         const user = userEvent.setup();

//         render(
//             <MemoryRouter>
//                 <Header
//                     user={mockUser}
//                     setUser={vi.fn()}
//                     theme={undefined}
//                     setTheme={vi.fn()}
//                     fetchUserData={vi.fn()}
//                 />
//                 <Routes>
//                     <Route path="/" element={<Homepage />} />
//                     <Route
//                         path="/posts/:id"
//                         element={<Post user={mockUser} />}
//                     />
//                 </Routes>
//             </MemoryRouter>
//         );
//         // wait for the posts to render
//         await waitFor(() =>
//             expect(
//                 screen.getByText("This is a test blog post")
//             ).toBeInTheDocument()
//         );
//         user.click(screen.getByText("This is a test blog post"));
//         // wait for the post page to render
//         await waitFor(() =>
//             expect(screen.getByRole("heading", { name: "Comments" }))
//         );
//         await user.click(screen.getByRole("button", { name: "Submit" }));
//         expect(screen.getByText("Your comment cannot be empty"));
//     });
// });

describe("comment test", () => {
    it("user fails to make a comment", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={["/posts/64f7a382801d417e9755e382"]}>
                <Routes>
                    <Route
                        path="/posts/:id"
                        element={<Post user={mockUser} />}
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(
                screen.getByText("This is a test blog post")
            ).toBeInTheDocument()
        );

        act(() => {
            user.click(screen.getByText("This is a test blog post"));
            // wait for the post page to render
            waitFor(() =>
                expect(screen.getByRole("heading", { name: "Comments" }))
            );
            user.click(screen.getByRole("button", { name: "Submit" }));
        });

        await waitFor(() => {
            expect(screen.getByText("Your comment cannot be empty"));
        });
    });

    it("user makes a comment", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={["/posts/64f7a382801d417e9755e382"]}>
                <Routes>
                    <Route
                        path="/posts/:id"
                        element={<Post user={mockUser} />}
                    />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() =>
            expect(
                screen.getByText("This is a test blog post")
            ).toBeInTheDocument()
        );

        act(() => {
            user.click(screen.getByText("This is a test blog post"));
            // wait for the post page to render
            waitFor(() =>
                expect(screen.getByRole("heading", { name: "Comments" }))
            );

            const textbox = screen.getByPlaceholderText(
                "Share your thoughts on this article"
            );
            user.type(textbox, "This is a test comment");

            user.click(screen.getByRole("button", { name: "Submit" }));
        });
        expect(screen.getByText("This is a test comment"));
    });
});
