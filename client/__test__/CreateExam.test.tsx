import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CreateExamPage from "../src/app/course/[courseId]/createexam/page";

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

describe("Exam Create", () => {
  it("renders", () => {
    render(<CreateExamPage />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    expect(1);
  });
});
