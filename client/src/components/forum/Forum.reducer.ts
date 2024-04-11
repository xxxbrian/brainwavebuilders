import { Forum, Thread } from "@/backend";

export interface ForumState {
  threads: Thread[];
  isLoading: boolean;
  isCreatingNewThread: boolean;
  forum?: Forum;
}

export const initialState: () => ForumState = () => ({
  isLoading: false,
  threads: [],
  isCreatingNewThread: false,
});

export type ForumAction =
  | { type: "load-threads"; threads: Thread[] }
  | { type: "load-forum"; forum: Forum }
  | { type: "set-loading"; isLoading: boolean }
  | {
      type: "set-creating-new-thread";
      isCreatingNewThread: boolean;
    };

const isNever = (value: never) => value;

export const reducer: React.Reducer<ForumState, ForumAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case "load-threads":
      return { ...state, threads: action.threads, isLoading: false };
    case "set-loading":
      return { ...state, isLoading: action.isLoading };
    case "load-forum":
      return { ...state, forum: action.forum, isLoading: false };
    case "set-creating-new-thread":
      return { ...state, isCreatingNewThread: action.isCreatingNewThread };
    default:
      return isNever(action);
  }
};
