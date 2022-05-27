import { Actions } from "./constants";

export const updateCommentScore = (commentId, score) => ({
  type: Actions.UPDATE_COMMENT_SCORE,
  payload: { commentId, score },
});

export const updateReplyScore = (parentCommentId, replyId, score) => ({
  type: Actions.UPDATE_REPLY_SCORE,
  payload: { parentCommentId, replyId, score },
});
