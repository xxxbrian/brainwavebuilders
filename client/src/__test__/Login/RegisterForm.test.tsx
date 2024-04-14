import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import React from "react";

import RegisterForm from "../../components/login/RegisterForm";

describe("Register Form Test", () => {
  const user = userEvent.setup();

  it("Register Form Tests", () => {
    render(
      <RegisterForm
        firstName=""
        onChangeFirstName={(firstName: string) => {}}
        lastName=""
        onChangeLastName={(lastName: string) => {}}
        email=""
        onChangeEmail={(email: string) => {}}
        password=""
        onChangePassword={(password: string) => {}}
        onClickRegisterConfirm={() => {}}
        onClickBack={() => {}}
      />,
    );
    const elem1 = screen.getAllByText(/Register/i);
    expect(elem1[0]).toBeInTheDocument();
    const elem2 = screen.getByPlaceholderText(/Enter your first name/i);
    expect(elem2).toBeInTheDocument();
    const elem3 = screen.getByPlaceholderText(/Enter your last name/i);
    expect(elem3).toBeInTheDocument();
    const elem4 = screen.getByPlaceholderText(/Enter your email/i);
    expect(elem4).toBeInTheDocument();
    const elem5 = screen.getByPlaceholderText(/Enter your password/i);
    expect(elem5).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
});
