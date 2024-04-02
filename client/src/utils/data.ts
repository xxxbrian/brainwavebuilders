import { Course, User } from "@/backend";

export const UserData: User = {
  email: "lincoln@yyjlincoln.com",
  firstName: "Lincoln",
  lastName: "Yan",
};

export const CourseData: Course = {
  createdAt: new Date().getTime(),
  createdBy: UserData,
  description: "",
  id: "1",
  name: "COMP1522: Introduction to React",
  code: "COMP1522",
};
