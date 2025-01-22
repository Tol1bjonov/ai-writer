import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './components/layouts/dashboard-layout'

const router = createBrowserRouter([
   {
      path: '/',
      element: <h1 className="text-5xl">Home</h1>,
   },
   {
      path: 'login',
      element: <h1 className="text-5xl">Login</h1>,
   },
   {
      path: 'register',
      element: <h1 className="text-5xl">Register</h1>,
   },
   {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
         {
            index: true,
            element: <h1>Dashboard main page</h1>,
         },
      ],
   },
])

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>
)
