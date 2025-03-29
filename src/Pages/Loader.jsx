import React from 'react'
import  {Spin} from 'antd'

function Loader(){
    return(
        <div className="w-full h-[100vh] fixed top-0 flex flex-col gap-4 justify-center items-center ">
            <Spin size='large' />
            <p className="text-sm font-medium">Preparing Awesomeness...</p>
        </div>
    )
}

export default Loader;