import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import React from "react";

import VerificationForm from "../../components/login/VerificationForm";

describe("Verification Form Test", () => {
  const user = userEvent.setup();

  it("Verification Form Tests", () => {
    expect(1);
  });
});
