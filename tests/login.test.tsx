import { waitFor, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import App from "../src/App";
import "./setup";
import userEvent from "@testing-library/user-event";
import Login from "../src/components/Login";

// vi.mock(import("../src/components/Login"), async (importOriginal) => {
//     const actual = await importOriginal();
//     return {
//         ...actual,
//         sendLogin: vi.fn(),
//     };
// });

// incomplete test
// it("user logins in", async () => {
//     const user = userEvent.setup();

//     render(<App />);
//     await user.click(screen.getByText("Login"));
//     expect(screen.getByRole("heading", { name: "Login" }));
//     await user.type(screen.getByLabelText("Username (E-mail)"), "john@doe.com");
//     await user.type(screen.getByLabelText("Password"), "password");
//     await user.click(screen.getByRole("button", { name: "Submit" }));

//     await waitFor(() =>
//         screen.getByRole("heading", { name: "Login was successful!" })
//     );
// });
