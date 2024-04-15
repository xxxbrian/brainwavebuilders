import { Course, User } from "@prisma/client";
import { generalEmail } from "./general";
import { EmailGenerator } from "@/data/mailer";

interface AnnouncementEmail {
  title: string;
  course: Course;
  sender: User;
  recipient: User;
  content: string;
}

export const announcementEmail: EmailGenerator<AnnouncementEmail> = async ({
  course,
  title,
  recipient,
  sender,
  content,
}) => {
  return generalEmail({
    title: `[${course.code}] ${title}`,
    name: recipient.firstName,
    content: `Your teacher <b>${sender.firstName} ${sender.lastName}</b> has posted a new announcement in ${course.name}:

<pre>
  ${content}
</pre>
    `,
    senderName: "BrainWaveBuilder",
  });
};
