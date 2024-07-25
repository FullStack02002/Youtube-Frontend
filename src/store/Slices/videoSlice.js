import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosinstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constant";

const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
  publishToggled: false,
};

export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
      const url = new URL(`${BASE_URL}/video`);
      if (userId) url.searchParams.set("userId", userId);
      if (query) url.searchParams.set("query", query);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const response=await axiosInstance.get(url);
      return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
  }
);

export const getVideoById=createAsyncThunk(
  "getVideoById",
  async({videoId})=>{
    try {
      const response=await axiosInstance.get(`/video/v/${videoId}`);
      return response.data.data;
      
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
)



const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    makeVideosNull:(state)=>{
        state.videos.docs=[];
    },
    makeVideoNull:(state)=>{
      state.video=null;
    }

  },
  extraReducers:(builder)=>{
   builder.addCase(getAllVideos.pending,(state)=>{
    state.loading=true;
   })
   builder.addCase(getAllVideos.fulfilled,(state,action)=>{
    state.loading=false;
    state.videos.docs=[...state.videos.docs,...action.payload.docs];
    state.videos.hasNextPage=action.payload.hasNextPage;
   })
   builder.addCase(getVideoById.pending,(state)=>{
    state.loading=true;
   })
   builder.addCase(getVideoById.fulfilled,(state,action)=>{
    state.loading=false;
    state.video=action.payload;
   })
  }
});



export const {makeVideosNull,makeVideoNull}=videoSlice.actions;



export default videoSlice.reducer;
