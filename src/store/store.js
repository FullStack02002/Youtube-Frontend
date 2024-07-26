import { configureStore} from "@reduxjs/toolkit";
import authSliceReducer from './Slices/authSlice.js'
import videoSliceReducer from './Slices/videoSlice.js'
import likeSliceReducer from "./Slices/likeSlice.js";
import commentSliceReducer from "./Slices/commentSlice.js";

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        video:videoSliceReducer,
        like:likeSliceReducer,
        comment:commentSliceReducer

    }
})

export default store;