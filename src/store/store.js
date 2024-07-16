import { configureStore} from "@reduxjs/toolkit";
import authSliceReducer from './Slices/authSlice.js'
import videoSliceReducer from './Slices/videoSlice.js'

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        video:videoSliceReducer,

    }
})

export default store;