import { waitFor, render, screen } from "@testing-library/react";
import React from "react";
import { HashRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import Homepage from "../src/components/Homepage";
import "./setup";

describe("homepage tests", () => {
    beforeEach(() => {
        render(<Homepage />, { wrapper: HashRouter });
    });

    it("homepage renders posts", async () => {
        expect(
            screen.getByRole("heading", {
                name: "Welcome to the blog",
                level: 1,
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "Latest Articles", level: 2 })
        ).toBeInTheDocument();
        // waitFor is required as we need to wait for the component to fully render
        await waitFor(() =>
            expect(
                screen.getByText("This is a test blog post")
            ).toBeInTheDocument()
        );
    });

    it("homepage renders number of pages", async () => {
        await waitFor(() =>
            expect(
                screen.getByLabelText("Page 1 is your current page")
            ).toBeInTheDocument()
        );
    });
});
