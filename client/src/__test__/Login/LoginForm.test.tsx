import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import React from "react";

import LoginForm from "../../components/login/LoginForm";

describe("Login Form Test", () => {
  const user = userEvent.setup();

  it("Login Form Tests", () => {
    render(
      <LoginForm
        password=""
        email=""
        onChangeEmail={(email: string) => {}}
        onChangePassword={(password: string) => {}}
        onClickCreateAccount={() => {}}
        onClickForgotPassword={() => {}}
        onClickSignIn={() => {}}
      />,
    );
    const elem1 = screen.getAllByText(/Sign in/i);
    expect(elem1[0]).toBeInTheDocument();
    const elem2 = screen.getByPlaceholderText(/Enter your email/i);
    expect(elem2).toBeInTheDocument();
    const elem3 = screen.getByPlaceholderText(/Enter your password/i);
    expect(elem3).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
});
