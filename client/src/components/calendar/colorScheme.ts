export const bgcolors = {
  lecture: "bg-green-50",
  tutorial: "[#ECFEFF]",
  assignment: "bg-pink-50",
  exam: "bg-blue-50",
  default: "bg-gray-50",
};

export const subject_colors = {
  lecture: "bg-green-700",
  tutorial: "bg-[#0E7490]",
  assignment: "bg-pink-600",
  exam: "bg-blue-700",
  default: "bg-gray-700",
};

export const getBgColor = (type: string): string => {
  switch (type) {
    case "lecture":
      return bgcolors.lecture;
    case "tutorial":
      return bgcolors.tutorial;
    case "assignment":
      return bgcolors.assignment;
    case "exam":
      return bgcolors.exam;
    default:
      return bgcolors.default;
  }
};

export const getSubjectColor = (type: string): string => {
  switch (type) {
    case "lecture":
      return subject_colors.lecture;
    case "tutorial":
      return subject_colors.tutorial;
    case "assignment":
      return subject_colors.assignment;
    case "exam":
      return subject_colors.exam;
    default:
      return subject_colors.default;
  }
};
