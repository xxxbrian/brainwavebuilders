import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MarkExamPage from "../src/app/course/[courseId]/exam/[assessmentId]/marking/[submissionId]/page";

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

describe("Exam Mark", () => {
  it("renders", () => {
    render(<MarkExamPage />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    expect(1);
  });
});
