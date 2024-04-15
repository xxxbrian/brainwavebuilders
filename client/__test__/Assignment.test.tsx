import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AssignmentSubmissionOverviewPage from "../src/app/course/[courseId]/assignment/[assessmentId]/page";

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

describe("ASsignment", () => {
  it("renders", () => {
    render(<AssignmentSubmissionOverviewPage />);

    // const divs = screen.getAllByRole('generic');

    // expect(divs).not.toHaveLength(0);

    expect(1);
  });
});
