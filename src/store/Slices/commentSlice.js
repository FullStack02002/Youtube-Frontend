import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosinstance";
import toast from "react-hot-toast";

const initialState={
    loading:false,
    comments:[],
    totalComments:0
}

export const createAComment=createAsyncThunk(
    "createAComment",
    async({videoId,content,avatar,username,_id})=>{
        try{
            const response=await axiosInstance.post(`/comment/${videoId}`,{
                content,
            })
            toast.success(response.data?.message);
            const data=response.data.data;
            return {...data,owner:{avatar,username,_id}};
            // sending avatar because when comment is created we have to show it on frontend instanly but in response avatar was not present
            // same reason for username and _id
            

        }
        catch(error){
            toast.error(error?.response?.data?.error);
            throw error
        }
    }

)

export const editAComment=createAsyncThunk(
    "editAComment",
    async({commentId,content})=>{
        try {
            const response=await axiosInstance.patch(`/comment/c/${commentId}`,{
                content
            })
            toast.success(response.data?.message)
        
            return response.data.data;
            
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
)
export const deleteAComment=createAsyncThunk(
    "deleteAComment",
    async({commentId})=>{
        try{
            const response=await axiosInstance.delete(`/comment/c/${commentId}`);
            toast.success(response.data?.message);
            return response.data.data;

        }
        catch(error){
            toast.error(error?.response?.data?.error);
        }
    }
)

export const getVideoComments=createAsyncThunk(
    "getVideoComments",
    async({videoId})=>{
        try {
            const response=await axiosInstance.get(`/comment/${videoId}`)
            return response.data.data;
            
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
)

const commentSlice=createSlice({
    name:"comment",
    initialState,
    reducers:{
        makeCommentsEmpty:(state)=>{
            state.comments=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createAComment.fulfilled,(state,action)=>{
            state.comments.unshift(action.payload)
            console.log(state.comments);
            state.totalComments++;
        }),
        builder.addCase(deleteAComment.fulfilled,(state,action)=>{
            state.comments=state.comments.filter((comment)=>comment._id!==action.payload.commentId)
            state.totalComments--;
        })
        builder.addCase(getVideoComments.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getVideoComments.fulfilled,(state,action)=>{
            state.loading=false;
            state.comments=[...state.comments,...action.payload.docs];
            state.totalComments=action.payload.totalDocs;
        })
    }
})
export const {makeCommentsEmpty} =commentSlice.actions;

export default commentSlice.reducer;