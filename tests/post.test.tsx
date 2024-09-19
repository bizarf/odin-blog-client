import { waitFor, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import "./setup";
import userEvent from "@testing-library/user-event";

describe("post and comment tests", () => {
    it("user clicks on a blog post entering the page, and sees the comments", async () => {
        const user = userEvent.setup();
        render(<App />);

        expect(
            screen.getByRole("heading", { name: "Welcome to the blog" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "Latest Articles" })
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
