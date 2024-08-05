import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosinstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  likedVideos: [],
};

export const toggleVideoLike = createAsyncThunk(
  "toggleVideoLike",
  async ({videoId}) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const toggleTweetLike = createAsyncThunk(
  "toggleTweetLike",
  async ({tweetId}) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  "toggleCommentLike",
  async ({commentId}) => {
    try {
      const response = await axiosInstance.post(`likes/toggle/c/${commentId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const toggleReplyLike = createAsyncThunk(
  "toggleReplyLike",
  async ({replyId}) => {
    try {
      const response = await axiosInstance.post(`likes/toggle/r/${replyId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getLikedVideos=createAsyncThunk(
    "getLikedVideos",
    async()=>{
        try {
            const response=await axiosInstance.get("likes/videos");
            return response.data.data;
            
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
            
        }
    }
)

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    makeLikedVideosEmpty:(state)=>{
      state.likedVideos=[];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLikedVideos.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(getLikedVideos.fulfilled,(state,action)=>{
        state.loading=false;
        state.likedVideos=action.payload;
    })
  },
});

export const {makeLikedVideosEmpty}=likeSlice.actions;

export default likeSlice.reducer;
