import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import React from "react";

import Home from "../app/page";

describe("Login Page Testing", () => {
  const user = userEvent.setup();

  it("Check Render", () => {
    render(<Home />);
  });

  it("Check Login Text Fields Update", () => {});

  it("Check Login Button Presses", () => {});

  it("Check Update to Create Account", () => {});

  it("Check Create Text Field Updates", () => {});

  it("Check Create Text Field Updates", () => {});
});
