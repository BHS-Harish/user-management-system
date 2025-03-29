import React, { useEffect, useState } from 'react'
import { Tooltip, Button, notification, message, Drawer, Input } from 'antd'
import { useDispatch } from 'react-redux';
import { deleteUser,editUser } from '../../actions/action'
import { LuUserPen, LuUserMinus } from "react-icons/lu";

function UserCard({ data }) {

    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

    const [api, ContextHolder] = notification.useNotification()
    const [messageApi, ContextHolderr] = message.useMessage()

    const [user, setUsers] = useState({})
    useEffect(() => {
        setUsers(data)
    }, [data])

    const handleDelete = () => {
        deleteUser(data?.id, dispatch, api, messageApi)
    }

    return (
        <div className="min-w-[300px] max-w-[600px] w-full border p-4 rounded-lg border-[#ccc]">
            {ContextHolder}
            {ContextHolderr}
            <div className='w-full flex gap-3 items-center'>
                <img className='w-[50px] rounded-3xl' src={user?.avatar} alt="avatar" />
                <div>
                    <p className='font-medium'>{user?.firstname} {user?.last_name}</p>
                    <a className='text-xs text-blue-500' href={`mailto:${user?.email}`} >{user?.email}</a>
                </div>
            </div>
            <div className="w-full flex justify-end gap-4">
                <Tooltip title="Edit User" >
                    <Button type="primary" icon={<LuUserPen />} onClick={() => {
                        setOpen(true)
                    }} ></Button>
                </Tooltip>
                <Tooltip title="Delete User" >
                    <Button type="primary" danger icon={<LuUserMinus />} onClick={handleDelete} ></Button>
                </Tooltip>
            </div>
            <EditUser user={user} open={open} setOpen={setOpen} />
        </div>
    )
}

export default UserCard;

function EditUser({ user, open, setOpen }) {

    const handleClose = () => {
        setOpen(false)
    }

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

    const [api, ContextHolder] = notification.useNotification()
    const [messageApi, ContextHolderr] = message.useMessage()

    useEffect(() => {
        setFirstName(user?.first_name)
        setLastName(user?.last_name)
        setEmail(user?.email)        
    }, [open])


    async function update(data,id){
        const result=await editUser(id,data,api,messageApi)
        if(result==true){
            setOpen(false)
        }
    }

    const handleEdit=(e)=>{
        e.preventDefault()
        if(firstName?.trim()&&lastName.trim()&&email?.trim()){
            let data={first_name:firstName,last_name:lastName,email}
            update(data,user?.id)
        }else{
            api.error({
                message: "Error",
                description: "Please provide all details",
                placement: "bottomRight"
            })
        }
    }

    return (
        <Drawer width={"100%"} open={open} title="Edit User" onClose={handleClose} extra={
            <Button onClick={handleClose}>Close</Button>
        } >
            {ContextHolder}
            {ContextHolderr}
            <p className='text-center font-medium text-xl text-indigo-600 mb-8'>Update User Details</p>
            <div className='w-full flex justify-center'>
                <form className='flex flex-col gap-4 min-w-[300px] max-w-[600px] w-full' onSubmit={handleEdit} >
                    <Input type='text' placeholder='First Name' onChange={(e)=>{
                        setFirstName(e.target.value)
                    }} value={firstName} required />
                    <Input type='text' placeholder='Last Name' onChange={(e)=>{
                        setLastName(e.target.value)
                    }} value={lastName} required />
                    <Input type='email' placeholder='Email' onChange={(e)=>{
                        setEmail(e.target.value)
                    }} value={email} required />
                    <Button type='primary' htmlType='submit' className='w-full'>Update User</Button>
                </form>
            </div>
        </Drawer>
    )
}