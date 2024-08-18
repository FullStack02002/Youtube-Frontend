import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosinstance";
import toast from "react-hot-toast";
import playlistSlice from "./playlistSlice";

const initialState={
    loading:false,
    subscribed:null,
    channelSubscribers:[],
    mySubscriptions:[],
}

export const toggleSubscriptions=createAsyncThunk(
    "toggleSubscriptions",
    async({channelId})=>{
        try{
            const response=await axiosInstance.post(`subscriptions/c/${channelId}`)
            return response.data.data.subscribed;

        }catch(error){
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
)
export const getUserChannelSubscribers=createAsyncThunk(
    "getUserChannelSubscribers",
    async(channelId)=>{
        try {
            const response=await axiosInstance.get(
                `subscriptions/c/${channelId}`
            )
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
            
        }
    }
)

export const getSubscribedChannels=createAsyncThunk(
    "getSubscribedChannels",
    async()=>{
        try{
            const response=await axiosInstance.get(`subscriptions/u/`);
            return response.data.data

        }
        catch(error){
            return error;
        }
    }
)


const subscriptionSlice=createSlice({
    name:"subscription",
    initialState,
    reducers:{
        makemySubscriptionsEmpty:(state)=>{
            state.mySubscriptions=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(toggleSubscriptions.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(toggleSubscriptions.fulfilled,(state,action)=>{
            state.loading=false;
            state.subscribed=action.payload;
        })
        builder.addCase(getUserChannelSubscribers.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getUserChannelSubscribers.fulfilled,(state,action)=>{
            state.loading=false;
            state.channelSubscribers=action.payload;
        })
        builder.addCase(getSubscribedChannels.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getSubscribedChannels.fulfilled,(state,action)=>{
            state.loading=false;
            state.mySubscriptions=action.payload;
        })

    }
})

export const {makemySubscriptionsEmpty}=subscriptionSlice.actions;


export default subscriptionSlice.reducer;