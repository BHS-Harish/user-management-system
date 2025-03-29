import React, {useState, useEffect } from 'react'
import {notification,message,Button,Input} from 'antd'
import UserCard from './components/UserCard'
import Loader from '../Pages/Loader'
import {getUsers,logoutUser} from '../actions/action'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

function Users(){
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const[page,setPage]=useState(1)
    const[pages,setPages]=useState([])

    const[api,ContextHolder]=notification.useNotification()
    const[messageApi,ContextHolderr]=message.useMessage()

    const loading=useSelector((state)=>state?.loader?.loading)
    const data=useSelector((state)=>state?.app?.data)
    const users=useSelector((state)=>state?.app?.users)

    const[filteredUsers,setFilteredUsers]=useState([])
    const[filterName,setFilterName]=useState("")

    useEffect(()=>{
        if(filterName=="")
            setFilteredUsers(users)
        else{
            setFilteredUsers(users?.filter((user)=>{return user?.last_name?.startsWith(filterName)}))
        }
    },[users,filterName])


    useEffect(()=>{
        if(!localStorage.getItem("authToken"))
            navigate('/')
    },[])

    async function fetctData(){
        await getUsers(page,dispatch,api,messageApi)
    }

    useEffect(()=>{
        var arr=[]
        for(let i=1;i<=data?.total_pages;++i){
            arr.push(i)
        }
        setPages(arr)
    },[data])

    useEffect(()=>{
        fetctData()
        setFilterName("")
    },[page])


    return(
        <>
        {ContextHolder}
        {ContextHolderr}
        {
            loading?
            <Loader/>
            :
            <div className="w-full px-8 ">
                <div className="w-full py-4 flex justify-end">
                    <Button type="primary" onClick={()=>{
                        logoutUser(dispatch,navigate,api)
                    }} >Logout</Button>
                </div>
                <div className="w-full py-4 px-0 md:px-12 flex justify-end mt-12">
                    <p className='font-medium text-violet-600'>Page {data?.page} of {data?.total_pages}</p>
                </div>
                <div className="flex flex-col items-center gap-5 mb-12">
                <Input className='min-w-[300px] max-w-[600px] w-full' type='text' placeholder='Search by name...' onChange={(e)=>{
                    setFilterName(e.target.value)
                }} value={filterName} />
                    {
                        filteredUsers?.map((user,key)=>{
                            return(
                                <UserCard data={user} key={key} />
                            )
                        })
                    }
                </div>
                <div className="w-full flex justify-end py-4">
                    <p className='text-xs font-medium'>{data?.per_page} users out of {data?.total} pages</p>
                </div>
                <div className="flex justify-end gap-2 mb-12 select-none">
                    {
                        pages?.map((pg,index)=>{
                            return(
                                <p className={`py-2 px-4 font-medium w-fit rounded-md cursor-pointer ${page==pg?"bg-indigo-600 text-white":"bg-[#ccc] text-black"}`} key={index} onClick={()=>{
                                    setPage(pg)
                                }} >{pg}</p>
                            )
                        })
                    }
                </div>
            </div>
        }
        </>
    )
}

export default Users