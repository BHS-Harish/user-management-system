import  {createSlice} from "@reduxjs/toolkit"

export const LoadingSlice=createSlice({
    name:"app",
    initialState:{
        loading:true
    },
    reducers:{
        setLoadingSuccess:(state,action)=>{
            return{
                loading:true
            }
        },
        setLoadingFailure:(state,action)=>{
            return{
                loading:false
            }
        }
}})

export const {setLoadingFailure,setLoadingSuccess}=LoadingSlice.actions
export default LoadingSlice.reducer