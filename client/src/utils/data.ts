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
  dueDate: "2024-04-16T00:00:00Z",
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
  const events: Record<string, Event[]> = {};
  for (
    let i = 1;
    i <= new Date(mockTime.getFullYear(), mockTime.getMonth() + 1, 0).getDate();
    i++
  ) {
    const key = `${mockTime.getFullYear()}-${mockTime.getMonth() + 1}-${i}`;
    if (i % 9 === 0) {
      events[key] = [
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
      ];
    } else {
      events[key] = [];
    }
  }
  return events;
};

export const mockEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        { type: "text", text: "This is a " },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#9333EA" } }],
          text: "Heading",
        },
        { type: "text", text: " 1" },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "This is a " },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#E00000" } }],
          text: "Heading",
        },
        { type: "text", text: " 2" },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        { type: "text", text: "This is a " },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#EAB308" } }],
          text: "Heading",
        },
        { type: "text", text: " 3" },
      ],
    },
    {
      type: "bulletList",
      attrs: { tight: true },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "This is a List" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "This is a List" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "This is a List" }],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This is plain text" },
        { type: "hardBreak" },
        { type: "text", text: "This is plain text with " },
        { type: "text", marks: [{ type: "bold" }], text: "bold," },
        { type: "text", text: " " },
        { type: "text", marks: [{ type: "italic" }], text: "Italic, " },
        { type: "text", marks: [{ type: "underline" }], text: "underline" },
        { type: "text", marks: [{ type: "italic" }], text: ", " },
        { type: "text", marks: [{ type: "strike" }], text: "strikethrough" },
        { type: "text", marks: [{ type: "italic" }], text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "code" },
        { type: "text", text: " and " },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#9333EA" } }],
          text: "beautiful",
        },
        { type: "text", text: " " },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#FFA500" } }],
          text: "colors",
        },
        {
          type: "text",
          marks: [{ type: "textStyle", attrs: { color: "#2563EB" } }],
          text: " !",
        },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "This is a TODO LIST" }],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: true },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "This is a finished TODO list" }],
            },
          ],
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "this is a quote" }],
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://avatars.githubusercontent.com/u/65097138",
        alt: "xxxbrian.png",
        title: "xxxbrian.png",
        width: null,
        height: null,
      },
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [{ type: "text", text: "fn the_code() {\n\n}" }],
    },
  ],
};

export const assignmentData = {
  id: "2",
  title: "Midterm Project",
  description:
    "Project assessment focusing on the practical application of database management.",
  courseId: "DBM302",
  type: "assignment",
  startDate: "2024-05-01T00:00:00Z",
  dueDate: "2024-05-15T00:00:00Z",
  questions: [],
  submissions: [
    {
      id: "abc1",
      assessmentId: "2",
      studentId: "Steve", // Should be an Id for this part, search student name by Id to get the name
      submittedAt: "2024-05-12T00:00:00Z",
      content: mockEditorContent,
      grade: 85,
    },
    {
      id: "abc2",
      assessmentId: "2",
      studentId: "Steve", // Should be an Id for this part, search student name by Id to get the name
      submittedAt: "2024-05-12T00:00:00Z",
      content: mockEditorContent,
      grade: 85,
    },
    {
      id: "abc3",
      assessmentId: "2",
      studentId: "Steve", // Should be an Id for this part, search student name by Id to get the name
      submittedAt: "2024-05-12T00:00:00Z",
      content: mockEditorContent,
      grade: 85,
    },
    {
      id: "abc4",
      assessmentId: "2",
      studentId: "Steve", // Should be an Id for this part, search student name by Id to get the name
      submittedAt: "2024-05-12T00:00:00Z",
      content: mockEditorContent,
      grade: 85,
    },
  ],
};

export const examData = {
  id: "5",
  title: "Final Exam",
  description:
    "This course aims for students to become proficient in a high-level programming language, C. It also focuses on long-term mental preparedness for programming, including problem-solving, debugging, and testing.",
  courseId: "COMP1522",
  type: "exam",
  startDate: "2024-04-10T00:00:00Z",
  dueDate: "2024-04-12T00:00:00Z",
  questions: [
    {
      assessmentId: "5",
      id: "question1",
      title: "Which city is the capital of France?",
      type: "MCQ",
      options: JSON.stringify(["Paris", "Berlin", "Rome"]),
      answer: "Paris",
      points: 5,
    },
    {
      assessmentId: "5",
      id: "question2",
      title: "Explain the process of photosynthesis.",
      type: "SAQ",
      answer:
        "photosynthesis, the process by which green plants and certain other organisms transform light energy into chemical energy. During photosynthesis in green plants, light energy is captured and used to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds.",
      points: 10,
    },
    {
      assessmentId: "5",
      id: "question3",
      title: "Explain the process of photosynthesis.",
      type: "SAQ",
      answer:
        "photosynthesis, the process by which green plants and certain other organisms transform light energy into chemical energy. During photosynthesis in green plants, light energy is captured and used to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds.",
      points: 10,
    },
  ],
  submissions: [
    {
      id: "xyz1",
      assessmentId: "5",
      studentId: "Steve", // Should be an Id for this part, search student name by Id to get the name
      submittedAt: "2024-05-12T00:00:00Z",
      answers: {
        question1: "Paris",
        question2: "lalalalalala",
        question3: "test",
      },
      grade: 0,
    },
  ],
};

export const examSubmission = {
  id: "xyz1",
  assessmentId: "5",
  studentId: "Steve", // Should be an Id for this part, search student name by Id to get the name
  submittedAt: "2024-05-12T00:00:00Z",
  answers: {
    question1: "Paris",
    question2: "lalalalalala",
    question3: "test",
  },
  grade: 0,
};
