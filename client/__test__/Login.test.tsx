import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../src/app/login/page";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      fetch: () => null,
    };
  },

  usePathname() {
    return () => {};
  },
}));

describe("Login", () => {
  it("renders", () => {
    render(<Login />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    const text = screen.getAllByRole("img");
    expect(text).not.toHaveLength(0);
  });
});
