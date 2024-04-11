import { Post } from "@/backend";
import AdvancedEditor from "../editor/AdvancedEditor";
import { Avatar } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const PostDisplay: React.FC<{
  post: Post;
}> = ({ post }) => {
  return (
    <div className="flex flex-col p-4 border-gray-300 border rounded-md space-y-4">
      <div className="flex items-center space-x-2">
        <Avatar
          src={post.createdBy?.avatar}
          fallback={post.createdBy?.firstName[0] ?? "?"}
        />
        <div className="flex flex-col">
          <div>
            {post.createdBy
              ? `${post.createdBy.firstName} ${post.createdBy.lastName}`
              : "Anonymous"}
          </div>
          <div className="text-sm font-gray-600">
            {dayjs(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
      <AdvancedEditor value={post.content} isEditable={false} />
    </div>
  );
};
