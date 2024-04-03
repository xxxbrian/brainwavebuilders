import { Course, User } from "@/backend";
import { type Event } from "@/components/calendar/Calendar";

export const UserData: User = {
  email: "lincoln@yyjlincoln.com",
  firstName: "Lincoln",
  lastName: "Yan",
};

export const CourseData: Course = {
  createdAt: new Date().getTime(),
  createdBy: UserData,
  description:
    "Hello world. Hello world Hello world Hello world Hello world Hello world Hello world",
  id: "1",
  name: "COMP1522: Introduction to React",
  code: "COMP1522",
};

export const mockTime = new Date("2024-03-01");
export const mockEvents = () => {
  const events = new Map<string, Event[]>();
  for (
    let i = 1;
    i <= new Date(mockTime.getFullYear(), mockTime.getMonth() + 1, 0).getDate();
    i++
  ) {
    const key = `${mockTime.getFullYear()}-${mockTime.getMonth() + 1}-${i}`;
    if (i % 9 === 0) {
      events.set(key, [
        {
          name:
            ["CS3900 Meeting", "ECSE321 Meeting", "COMP1522 Meeting"].sort(
              () => Math.random() - 0.5,
            )[0] ?? "CS3900 Meeting",
          time: "3 PM - 5 PM",
          // random in ["lecture", "tutorial", "assignment", "exam"]
          type:
            ["lecture", "tutorial", "assignment", "exam"].sort(
              () => Math.random() - 0.5,
            )[0] ?? "assignment",
        },
        {
          name:
            [
              "Assignment 1 Due",
              "Assignment 2 Due",
              "Assignment 3 Due",
              "Final Exam",
            ].sort(() => Math.random() - 0.5)[0] ?? "Assignment 1 Due",
          time: "10 AM - 11 AM",
          type:
            ["lecture", "tutorial", "assignment", "exam"].sort(
              () => Math.random() - 0.5,
            )[0] ?? "exam",
        },
      ]);
    } else {
      events.set(key, []);
    }
  }
  return events;
};