import  {createSlice} from "@reduxjs/toolkit"
import { data } from "react-router"

export const appSlice=createSlice({
    name:"app",
    initialState:{
        data:{},
        users:[]
    },
    reducers:{
        setUsersSuccess:(state,action)=>{
            return{
                ...state,
                data:action.payload?.data,
                users:action.payload?.users
            }
        },
        setUsersFailure:(state,action)=>{
            return{
                ...state,
                data:{},
                users:[]
            }
        }
    }
})

export const {setUsersSuccess,setUsersFailure}=appSlice.actions
export default appSlice.reducer