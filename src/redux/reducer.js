import JsonData from "../../data.json" assert { type: "json" };
import { Actions } from "./constants";

const INITIAL_STATE = JsonData;

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.UPDATE_COMMENT_SCORE:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === payload.commentId
            ? {
                ...comment,
                score: payload.score,
              }
            : comment
        ),
      };

    case Actions.UPDATE_REPLY_SCORE:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === payload.parentCommentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === payload.replyId
                    ? {
                        ...reply,
                        score: payload.score,
                      }
                    : reply
                ),
              }
            : comment
        ),
      };

    case Actions.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload],
      };

    case Actions.ADD_REPLY:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === payload.parentCommentId
            ? { ...comment, replies: [...comment.replies, payload.replyData] }
            : comment
        ),
      };
    default:
      return state;
  }
};
