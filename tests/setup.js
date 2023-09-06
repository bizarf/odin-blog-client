import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "../src/mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Clean up after the tests are finished.
afterAll(() => server.close());

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    server.resetHandlers();
    cleanup();
    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests.
});
