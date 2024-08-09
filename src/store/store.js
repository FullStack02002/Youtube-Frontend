import { configureStore} from "@reduxjs/toolkit";
import authSliceReducer from './Slices/authSlice.js'
import videoSliceReducer from './Slices/videoSlice.js'
import likeSliceReducer from "./Slices/likeSlice.js";
import commentSliceReducer from "./Slices/commentSlice.js";
import subscriptionsSliceReducer from "./Slices/subscriptionsSlice.js";
import replySliceReducer from "./Slices/replySlice.js";
import playlistSliceReducer from "./Slices/playlistSlice.js"

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        video:videoSliceReducer,
        like:likeSliceReducer,
        comment:commentSliceReducer,
        subscription:subscriptionsSliceReducer,
        reply:replySliceReducer,
        playlist:playlistSliceReducer

    }
})

export default store;