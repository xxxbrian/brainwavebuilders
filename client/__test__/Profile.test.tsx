import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Profile from "../src/app/profile/page";

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

describe("Profile", () => {
  it("renders", () => {
    render(<Profile />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    const text = screen.getAllByRole("img");
    expect(text).not.toHaveLength(0);
  });
});
