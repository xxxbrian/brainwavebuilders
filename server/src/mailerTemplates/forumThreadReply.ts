import { Course, Post, Thread, User } from "@prisma/client";
import { generalEmail } from "./general";
import { EmailGenerator } from "@/data/mailer";

interface ThreadReplyEmail {
  title: string;
  course: Course;
  sender: User;
  recipient: User;

  thread: Thread;
  post: Post;
}

export const threadReplyEmail: EmailGenerator<ThreadReplyEmail> = async ({
  course,
  title,
  recipient,
  sender,
  post,
  thread,
}) => {
  return generalEmail({
    title: `[${course.code || course.name}] ${thread.title}`,
    name: recipient.firstName,
    content: `<b>${sender.firstName} ${sender.lastName}</b> has replied to <b>${thread.title}</b> in <b>${course.name}</b>:

<pre>
  ${post.content}
</pre>

You can reply to this thread in Brainwaves.`,
    senderName: "BrainWaveBuilder",
  });
};
