import axios from 'axios'
import { setUsersSuccess, setUsersFailure } from '../Slices/appSlice'
import { setLoadingFailure, setLoadingSuccess } from '../Slices/LoadingSlice'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const loginUser = async (email, password, navigate, api, message) => {
    message.info("Logging In...")
    await axios.post(`${BASE_URL}api/login`, { email, password }).then((res) => {
        localStorage.setItem("authToken", res.data?.token)
        api.success({
            message: "Success",
            description: "Login Successfully",
            placement: "bottomRight"
        })
        message.destroy()
        setTimeout(() => {
            navigate("/users")
        }, 2000)
    }).catch((err) => {
        api.error({
            message: "Error",
            description: err.response.data?.error,
            placement: "bottomRight"
        })
        message.destroy()
    })
}

export const getUsers = async (page, dispatch, api, message) => {
    message.info("Fetching data...")
    dispatch(setLoadingSuccess())
    await axios.get(`${BASE_URL}api/users?page=${page}`).then((res) => {
        message.destroy()
        let data = { ...res.data }
        delete data?.data
        let users = res.data?.data
        dispatch(setLoadingFailure())
        dispatch(setUsersSuccess({ data, users }))
    }).catch((err) => {
        api.error({
            message: "Error",
            description: err.response.data?.error,
            placement: "bottomRight"
        })
        dispatch(setLoadingFailure())
        message.destroy()
    })
}

export const logoutUser = (dispatch, navigate, api) => {
    localStorage.removeItem("authToken")
    api.success({
        message: "Success",
        description: "Logout Successfully",
        placement: "bottomRight"
    })
    setTimeout(() => {
        navigate("/")
        dispatch(setUsersFailure())
    }, 2000)
}

export const deleteUser = async (id, dispatch, api, message) => {
    message.info("Deleting...")
    await axios.delete(`${BASE_URL}api/users/${id}`).then((res) => {
        if (res.status === 204)
            api.success({
                message: "Info",
                description: "Unable to delete",
                placement: "bottomRight"
            })
        else
            api.success({
                message: "Success",
                description: "Deleted User Successfully",
                placement: "bottomRight"
            })
        message.destroy()
    }).catch((err) => {
        message.info("Unable to delete the user")
        message.destroy()
    })
}

export const editUser = async (id, data, api, message) => {
    var result=false
    message.info("Updating...")
    await axios.put(`${BASE_URL}api/users/${id}`,data).then((res) => {
        if (res.status === 204)
            api.success({
                message: "Info",
                description: "Unable to edit",
                placement: "bottomRight"
            })
        else{
            api.success({
                message: "Success",
                description: "Edited User Successfully",
                placement: "bottomRight"
            })
            result=true
        }
        message.destroy()
    }).catch((err) => {
        message.info("Unable to edit the user")
        message.destroy()
    })
    return result;
}