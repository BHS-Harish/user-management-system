import React,{useEffect, useState} from 'react'
import {notification,message} from 'antd'
import {useNavigate} from 'react-router-dom'
import {loginUser} from '../actions/action'
import Bg from '../assets/login-bg.svg'

function Login(){

    const navigate=useNavigate()

    const[email,setEmail]=useState("eve.holt@reqres.in")
    const[password,setPassword]=useState("cityslicka")

    const[emailError,setEmailError]=useState(false)
    const[passwordError,setPasswordError]=useState(false)

    const[api,ContextHolder]=notification.useNotification()
    const[messageApi,ContextHolderr]=message.useMessage()

    useEffect(()=>{
        if((email?.length==0)||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
            setEmailError(true)
        else
            setEmailError(false)
    },[email])

    useEffect(()=>{
        if(password?.length<8)
            setPasswordError(true)
        else
            setPasswordError(false)
    },[password])

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(email?.trim()&&password?.trim()){
            loginUser(email,password,navigate,api,messageApi)
        }else{
            api.error({
                message:"Error",
                description:"Please provide email and password",
                placement:"bottomRight"
            })
        }   
    }

    return(
        <div className="w-full min-h-[100vh] flex select-none">
            {ContextHolder}
            {ContextHolderr}
            <div className='w-2/5 hidden md:block p-8 relative hidden md:block h-[100vh] bg-cover' style={{ background: `url("${Bg}")` }}>
            </div>
            <div className='md:w-3/5 w-full h-[100vh] flex flex-col gap-6 justify-center items-center'>
                <h1 className='text-xl font-medium text-violet-600'>Login with your account</h1>
                <form className='w-[300px] flex flex-col gap-6 ' onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col gap-1'>
                        <p className='text-xs font-medium text-violet-600'>Enter your email *</p>
                        <input className='outline-none border-b-2 border-[#ccc] focus:border-indigo-600 px-3 py-2 text-sm' type='email' placeholder='Example : sample@reqres.in' onChange={(e)=>{
                            setEmail(e.target.value)
                        }} value={email} required />
                        {
                            emailError&&(
                                <p className='text-xs font-medium text-red-600'>Please provide correct email address</p>
                            )
                        }
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <p className='text-xs font-medium text-violet-600'>Enter your password *</p>
                        <input className='outline-none border-b-2 border-[#ccc] focus:border-indigo-600 px-3 py-2 text-sm' type='password' placeholder='Enter your password' onChange={(e)=>{
                            setPassword(e.target.value)
                        }} value={password} required />
                        {
                            passwordError&&(
                                <p className='text-xs font-medium text-red-600'>Password must contain minimum 8 characters</p>
                            )
                        }
                    </div>
                    <button className='w-full py-3 text-xs bg-violet-500 duration-500 hover:bg-violet-600 font-medium text-white rounded-md cursor-pointer'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;