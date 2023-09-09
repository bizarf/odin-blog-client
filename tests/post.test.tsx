import { waitFor, render, screen } from "@testing-library/react";
import React from "react";
// import { HashRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
// import Homepage from "../src/components/Homepage";
import App from "../src/App";
import "./setup";
import userEvent from "@testing-library/user-event";

describe("post and comment tests", () => {
    it("user clicks on a blog post entering the page, and sees the comments", async () => {
        const user = userEvent.setup();
        // render(<Homepage />, { wrapper: HashRouter });
        render(<App />);

        expect(
            screen.getByRole("heading", { name: "Welcome to the blog" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "Articles" })
        ).toBeInTheDocument();
        // waitFor is required as we need to wait for the component to fully render
        await waitFor(() =>
            expect(
                screen.getByText("This is a test blog post")
            ).toBeInTheDocument()
        );
        await user.click(screen.getByText("This is a test blog post"));
        expect(
            screen.getByRole("heading", { name: "Comments" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", {
                name: "This is a test blog post",
            })
        ).toBeInTheDocument();
        expect(screen.getByText("This is a test comment")).toBeInTheDocument();
    });
});
