import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import { Login } from "../../src/app/login/page";
import { LoginForm } from "../../src/components/login/LoginForm";
import { RegisterForm } from "../../src/components/login/RegisterForm";
import { ResetForm } from "../../src/components/login/ResetForm";
import { VerificationForm } from "../../src/components/login/VerificationForm";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      fetch: () => null,
    };
  },

  usePathname() {
    return {};
  },
}));

describe("Login page testing", () => {
  beforeEach(() => {
    // write someting before each test
  });

  afterEach(() => {
    // write someting after each test
  });

  it("LoginForm Renders", async () => {
    render(<LoginForm />);

    const text1 = await screen.getAllByText(/Sign in/i);
    expect(text1[0]).toBeInTheDocument();

    //const loginLabel = screen.getAllByText('Sign in');

    //expect(loginLabel[0]).toBeInTheDocument();
  });
  it("RegisterForm Renders", async () => {
    render(<RegisterForm />);

    const text1 = await screen.getAllByText(/Register/i);
    expect(text1[0]).toBeInTheDocument();
  });

  it("ResetForm Renders", async () => {
    render(<ResetForm />);

    const text1 = await screen.getAllByText(/Reset/i);
    expect(text1[0]).toBeInTheDocument();
  });

  it("VerificationForm Renders", async () => {
    render(<VerificationForm />);

    const text1 = await screen.getAllByText(/Verify/i);
    expect(text1[0]).toBeInTheDocument();
  });

  it("Login change text on login form", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailText = await screen.getByPlaceholderText(/Sign in/i);
    user.click(emailText);
  });

  it("Sign in Button Presses work", async () => {});

  it("", async () => {});

  it("", async () => {});
});
