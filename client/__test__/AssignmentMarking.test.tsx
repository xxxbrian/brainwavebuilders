import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MarkAssignmentPage from "../src/app/course/[courseId]/assignment/[assessmentId]/marking/[submissionId]/page";

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

describe("MarkAssignmentPage", () => {
  it("renders", () => {
    render(<MarkAssignmentPage />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    expect(1);
  });
});
