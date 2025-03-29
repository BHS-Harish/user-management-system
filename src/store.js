import {configureStore} from '@reduxjs/toolkit'
import AppSlice from './Slices/appSlice'
import LoadingSlice from './Slices/LoadingSlice'

export default configureStore({
    reducer:{
        app:AppSlice,
        loader:LoadingSlice
    }
})