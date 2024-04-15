import { Post, PostStats, Thread, ThreadStats } from "../../backend";
import AdvancedEditor from "../editor/AdvancedEditor";
import { Avatar, IconButton } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useCallback } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

dayjs.extend(relativeTime);

export const PostDisplay: React.FC<{
  post: Post;
  onClickDelete?: (post: Post) => void;
  onClickLike?: (post: Post) => void;
  onEditCommitted?: (post: Post) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  // Whether the post is being displayed as the content of the thread
  asThreadContent?: boolean;
  threadStats?: ThreadStats;
  postStats?: PostStats;
}> = ({
  post,
  onClickLike,
  asThreadContent = false,
  threadStats,
  postStats,
}) => {
  const onClickLikeInner = useCallback(() => {
    onClickLike?.(post);
  }, [onClickLike, post]);

  return (
    <div
      className={`flex flex-col space-y-4 ${
        asThreadContent ? "" : "p-4 border-gray-300 border rounded-md "
      }`}
    >
      <div className="flex justify-between">
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
        {asThreadContent && threadStats && (
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="text-xl">{threadStats.views}</div>
              <div className="text-xs">VIEWS</div>
            </div>
          </div>
        )}
      </div>
      <AdvancedEditor value={post.content} isEditable={false} />

      <div className="flex items-center space-x-1">
        <div onClick={onClickLikeInner} className="cursor-pointer">
          {postStats?.liked ? <IoHeart /> : <IoIosHeartEmpty />}
        </div>

        <div className="text-xs text-center">{postStats?.likes ?? 0}</div>
      </div>
    </div>
  );
};
