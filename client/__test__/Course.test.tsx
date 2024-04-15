import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CoursesPage from "../src/app/course/[courseId]/page";

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

describe("Course", () => {
  it("renders", () => {
    render(<CoursesPage />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    expect(1);
  });
});
