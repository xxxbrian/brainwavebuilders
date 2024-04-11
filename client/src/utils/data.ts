import { Course, User } from "@/backend";
import { type Event } from "@/components/calendar/Calendar";
import { Assessment } from "@/backend";

export const UserData: User = {
  email: "lincoln@yyjlincoln.com",
  firstName: "Lincoln",
  lastName: "Yan",
};

export const quizData: Assessment = {
  id: "1",
  title: "Final Exam",
  description:
    "This course aims for students to become proficient in a high-level programming language, C. It also focuses on long-term mental preparedness for programming, including problem-solving, debugging, and testing.",
  courseId: "COMP1522",
  type: "exam",
  startDate: "2024-04-10T00:00:00Z",
  dueDate: "2024-04-12T00:00:00Z",
  questions: [
    {
      assessmentId: "1",
      id: "question1",
      title: "Which city is the capital of France?",
      type: "MCQ",
      options: JSON.stringify(["Paris", "Berlin", "Rome"]),
      points: 5,
    },
    {
      assessmentId: "1",
      id: "question2",
      title: "Explain the process of photosynthesis.",
      type: "SAQ",
      points: 10,
      // No options or correct answer provided for SAQ
    },
  ],
  submissions: [],
};

export const AssessmentsData: Assessment[] = [
  {
    id: "1",
    title: "Final Exam",
    description:
      "Comprehensive examination for advanced understanding of algorithmic principles.",
    courseId: "ALG201",
    type: "exam",
    startDate: "2024-03-10T00:00:00Z",
    dueDate: "2024-06-12T00:00:00Z",
    questions: [],
    submissions: [],
  },
  {
    id: "2",
    title: "Midterm Project",
    description:
      "Project assessment focusing on the practical application of database management.",
    courseId: "DBM302",
    type: "assignment",
    startDate: "2024-05-01T00:00:00Z",
    dueDate: "2024-05-15T00:00:00Z",
    questions: [],
    submissions: [],
  },
  {
    id: "3",
    title: "Network Security Exam",
    description:
      "Evaluation of students' knowledge in network security protocols and defenses.",
    courseId: "NET400",
    type: "exam",
    startDate: "2024-07-20T00:00:00Z",
    dueDate: "2024-07-22T00:00:00Z",
    questions: [],
    submissions: [],
  },
  {
    id: "4",
    title: "Web Development Assignment",
    description:
      "Practical assignment for building responsive web applications.",
    courseId: "WEB101",
    type: "assignment",
    startDate: "2023-01-05T00:00:00Z",
    dueDate: "2023-01-20T00:00:00Z",
    questions: [],
    submissions: [],
  },
  {
    id: "5",
    title: "Software Engineering Ethics",
    description:
      "Discussion-based assessment on the ethical considerations in software development.",
    courseId: "ETH303",
    type: "exam",
    startDate: "2024-09-10T00:00:00Z",
    dueDate: "2024-09-12T00:00:00Z",
    questions: [],
    submissions: [],
  },
];

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
