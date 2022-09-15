import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IComment {
  comment_id: string;
  text: string;
  total_likes: number;
  total_dislikes: number;
  like_status: boolean | null;
  user_id: string;
  username: string;
  profile_picture: string;
  created_at: string | number;
}

interface InitialState {
  comments: IComment[];
  newCommentText: string;
  commentToEdit: string;
  commentToDelete: string;
  page: number;
  totalComments: number;
}

const initialState: InitialState = {
  comments: [],
  newCommentText: "",
  commentToEdit: "",
  commentToDelete: "",
  page: 0,
  totalComments: 0,
};

export const commentsSectionSlice = createSlice({
  name: "comments_section",
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ comments: IComment[]; totalComments: number }>
    ) => {
      state.comments = action.payload.comments;
      state.totalComments = action.payload.totalComments;
    },
    setNewCommentText: (state, action: PayloadAction<{ text: string }>) => {
      state.newCommentText = action.payload.text;
    },
    setCommentToEdit: (state, action: PayloadAction<{ commentId: string }>) => {
      state.commentToEdit = action.payload.commentId;
    },
    setCommentToDelete: (
      state,
      action: PayloadAction<{ comment_id: string }>
    ) => {
      state.commentToDelete = action.payload.comment_id;
    },
    addComment: (state, action: PayloadAction<{ comment: IComment }>) => {
      state.comments = [action.payload.comment, ...state.comments];
      state.newCommentText = "";
      state.totalComments = state.totalComments + 1;
    },
    likeOrDislikeComment: (
      state,
      action: PayloadAction<{
        comment_id: string;
        actionType: "like" | "dislike" | null;
      }>
    ) => {
      state.comments = state.comments.map((comment) => {
        if (comment.comment_id === action.payload.comment_id) {
          const like_status = comment.like_status;
          const action_type = action.payload.actionType;
          if (action_type === "like" && like_status === false) {
            comment.like_status = true;
            comment.total_likes += 1;
            comment.total_dislikes -= 1;
            return comment;
          } else if (action_type === "dislike" && like_status === true) {
            comment.like_status = false;
            comment.total_likes -= 1;
            comment.total_dislikes += 1;
            return comment;
          } else if (action_type === "like" && like_status === true) {
            comment.like_status = null;
            comment.total_likes -= 1;
            return comment;
          } else if (action_type === "dislike" && like_status === false) {
            comment.like_status = null;
            comment.total_dislikes -= 1;
            return comment;
          } else if (action_type === "like" && like_status === null) {
            comment.like_status = true;
            comment.total_likes += 1;
            return comment;
          } else if (action_type === "dislike" && like_status === null) {
            comment.like_status = false;
            comment.total_dislikes += 1;
            return comment;
          }
        }
        return comment;
      });
    },
    editComment: (
      state,
      action: PayloadAction<{ commentId: string; newText: string }>
    ) => {
      state.comments = state.comments.map((comment) => {
        if (comment.comment_id === action.payload.commentId) {
          comment.text = action.payload.newText;
          return comment;
        }
        return comment;
      });
      state.commentToEdit = "";
    },
    deleteComment: (state, action: PayloadAction<{ comment_id: string }>) => {
      console.log(action.payload.comment_id);
      state.comments = state.comments.filter(
        (comment) => comment.comment_id !== action.payload.comment_id
      );
      state.commentToDelete = "";
      state.totalComments = state.totalComments - 1;
    },
    increaseCommentsSectionPage: (state) => {
      state.page = state.page + 1;
    },
    resetCommentIds: (state) => {
      state.commentToEdit = "";
      state.commentToDelete = "";
    },
    resetCommentsSection: (state) => {
      state.comments = [];
      state.commentToEdit = "";
      state.commentToDelete = "";
      state.page = 0;
    },
  },
});

export const {
  setComments,
  setNewCommentText,
  setCommentToEdit,
  setCommentToDelete,
  addComment,
  likeOrDislikeComment,
  editComment,
  deleteComment,
  increaseCommentsSectionPage,
  resetCommentIds,
  resetCommentsSection,
} = commentsSectionSlice.actions;

export default commentsSectionSlice.reducer;
