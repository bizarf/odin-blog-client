import { waitFor, render, screen } from "@testing-library/react";
import React from "react";
import { HashRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Homepage from "../src/components/Homepage";
import "./setup";

describe("homepage tests", () => {
    it("homepage renders posts", async () => {
        render(<Homepage />, { wrapper: HashRouter });

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
        screen.debug();
    });
});
