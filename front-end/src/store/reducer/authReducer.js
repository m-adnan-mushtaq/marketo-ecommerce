import {createReducer} from "@reduxjs/toolkit"
import { removeUserCredentials, setUserCredentials } from "store/actionCreator"

const initialState={
    user:null,
    token:null
}

const authReducer=createReducer(initialState,builder=>{
    builder.addCase(setUserCredentials,(state,{payload})=>{
        state.token=payload.token
        state.user=payload.user
    })
    builder.addCase(removeUserCredentials,(state)=>{
        state.token=null
        state.user=null
    })
})

//selectors
export const selectToken=state=>state.auth.token
export const selectUser=state=>state.auth.user
export const selectUserId= state=>state.auth?.user?._id

export default authReducer