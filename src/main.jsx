import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import Login from './Pages/Login'
import Users from './Pages/Users'
import store from './store'
import './index.css'


const router=createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:"/users",
    element:<Users/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
)
