import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import React from "react";

import ResetForm from "../../components/login/ResetForm";

describe("Reset Form Test", () => {
  const user = userEvent.setup();

  it("Reset Form Tests", () => {
    render(
      <ResetForm
        email=""
        onChangeEmail={(email: string) => {}}
        password=""
        onChangePassword={(password: string) => {}}
        onClickBack={() => {}}
        onClickSendResetEmail={() => {}}
      />,
    );
    const elem1 = screen.getAllByText(/Reset password/i);
    expect(elem1[0]).toBeInTheDocument();
    const elem2 = screen.getByPlaceholderText(/Enter your email/i);
    expect(elem2).toBeInTheDocument();
    const elem3 = screen.getByPlaceholderText(/Enter your new password/i);
    expect(elem3).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
});
