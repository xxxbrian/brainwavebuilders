import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import React from "react";

import LoginForm from "../components/login/LoginForm";

describe("Login Form Test", () => {
  it("should contain text sign in", () => {
    render(
      <LoginForm
        password="test"
        email="test"
        onChangeEmail={(email: string) => {}}
        onChangePassword={(password: string) => {}}
        onClickCreateAccount={() => {}}
        onClickForgotPassword={() => {}}
        onClickSignIn={() => {}}
      />,
    );
    const text = screen.getAllByText(/Sign in/i);
    expect(text[0]).toBeInTheDocument();
  });
});
