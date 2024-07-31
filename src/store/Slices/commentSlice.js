import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosinstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constant";

const initialState = {
  loading: false,
  comments: [],
  totalComments: 0,
};

export const createAComment = createAsyncThunk(
  "createAComment",
  async ({ videoId, content, avatar, username, _id }) => {
    try {
      const response = await axiosInstance.post(`/comment/${videoId}`, {
        content,
      });
      // toast.success(response.data?.message);
      const data = response.data.data;
      return {
        ...data,
        owner: { avatar, username, _id },
        isLiked: false,
        likesCount: 0,
      };
      // sending avatar because when comment is created we have to show it on frontend instanly but in response avatar was not present
      // same reason for username and _id
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const editAComment = createAsyncThunk(
  "editAComment",
  async ({
    commentId,
    content,
    avatar,
    username,
    _id,
    createdAt,
    likesCount,
    isLiked,
  }) => {
    try {
      const response = await axiosInstance.patch(`/comment/c/${commentId}`, {
        content,
      });
      // toast.success(response.data?.message)

      return {
        _id: commentId,
        content,
        owner: { username, avatar, _id },
        createdAt,
        likesCount,
        isLiked,
      };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log(error);
      throw error;
    }
  }
);
export const deleteAComment = createAsyncThunk(
  "deleteAComment",
  async ({ commentId }) => {
    try {
      const response = await axiosInstance.delete(`/comment/c/${commentId}`);
      // toast.success(response.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const getVideoComments = createAsyncThunk(
  "getVideoComments",
  async ({ videoId, sortBy, sortType }) => {
    try {
      const url = new URL(`${BASE_URL}/comment/${videoId}`);
      if(sortBy && sortType){
        url.searchParams.set("sortBy",sortBy);
        url.searchParams.set("sortType",sortType);
      }
      const response = await axiosInstance.get(url);
      return {...response.data.data,sortBy};
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    makeCommentsEmpty: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAComment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
      state.totalComments++;
    }),
      builder.addCase(deleteAComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
        state.totalComments--;
      }),
      builder.addCase(editAComment.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const index = state.comments.findIndex(
          (comment) => comment._id === _id
        );
        state.comments.splice(index, 1, action.payload);
        console.log(action.payload);
      });
    builder.addCase(getVideoComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoComments.fulfilled, (state, action) => {
      state.loading = false;
      const {sortBy}=action.payload;
      if(!sortBy){
        state.comments = [...state.comments, ...action.payload.docs];
      }
      else{
        state.comments=action.payload.docs
      }
      state.totalComments = action.payload.totalDocs;
    });
  },
});
export const { makeCommentsEmpty } = commentSlice.actions;

export default commentSlice.reducer;
