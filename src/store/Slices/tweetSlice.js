import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosinstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  tweets: [],
};

export const createTweet = createAsyncThunk(
  "createTweet",
  async ({ content }) => {
    try {
      const response = await axiosInstance.post("tweet/", {
        content,
      });
      toast.success(response.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getUserTweet = createAsyncThunk(
  "getUserTweet",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`tweet/user/${userId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteTweet = createAsyncThunk(
  "deleteTweet",
  async ({ tweetId }) => {
    try {
      await axiosInstance.delete(`tweet/${tweetId}`);
      toast.success(response.data?.message);
      return { tweetId };
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateTweet = createAsyncThunk(
  "updateTweet",
  async ({ tweetId }) => {
    try {
      const response = await axiosInstance.patch(`tweet/${tweetId}`);
      toast.success(response.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTweet.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets.unshift(action.payload);
    });
    builder.addCase(getUserTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserTweet.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
    });
    builder.addCase(deleteTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTweet.fulfilled, (state, action) => {
      const { tweetId } = action.payload;
      state.loading = false;
      state.tweets = state.tweets.filter((tweet) => tweet._id !== tweetId);
    });
    builder.addCase(updateTweet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTweet.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.tweets.findIndex(
        (tweet) => tweet._id === action.payload._id
      );
      const tweet = state.tweets[index];
      const updatedTweet = { ...tweet, content: action.payload.content };
      state.tweets.splice(index, 1, updatedTweet);
    });
  },
});

export default tweetSlice.reducer;
