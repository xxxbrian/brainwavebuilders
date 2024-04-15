import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "../src/app/dashboard/page";

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

describe("Dashboard", () => {
  it("renders", () => {
    render(<Dashboard />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    const text = screen.getAllByRole("img");
    expect(text).not.toHaveLength(0);
  });
});
