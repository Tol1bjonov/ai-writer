import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './components/layouts/dashboard-layout'
import DashboardHome from './pages/dashboard-home'
import { AppContextProvider } from './contexts/app.context'
import { Toaster } from 'react-hot-toast'
import { ContentContextProvider } from './contexts/content.context'
import DashboardFunction from './pages/dashboard.content'
import ContentNotFound from './components/dashboard/content-not-found'
import Share from './pages/share'
import Authlayout from './components/layouts/auth.layouts'
import Register from './components/auth/register'
import { AuthProvider } from './contexts/auth.context'

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
            element: <DashboardHome />,
         },
         {
            path: 'content/:id',
            element: <DashboardFunction />,
            errorElement: <ContentNotFound />,
         },
      ],
   },
   {
      path: 'share/:id',
      element: <Share />,
      errorElement: <ContentNotFound />,
   },
   {
      path: 'auth',
      element: <Authlayout />,
      children: [
         {
            path: 'register',
            element: <Register />,
         },
      ],
   },
])

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Toaster />
      <AppContextProvider>
         <AuthProvider>
            <ContentContextProvider>
               <RouterProvider router={router} />
            </ContentContextProvider>
         </AuthProvider>
      </AppContextProvider>
   </StrictMode>
)
