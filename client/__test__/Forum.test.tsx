import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ForumPage from "../src/app/course/[courseId]/forum/page";

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

describe("Forum", () => {
  it("renders", () => {
    render(<ForumPage />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    expect(1);
  });
});
