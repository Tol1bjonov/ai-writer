import { Outlet } from 'react-router-dom'
import Navabr from '../dashboard/navbar'
import Sidebar from '../dashboard/sidebar'

export default function DashboardLayout() {
   console.log(import.meta.env.VITE_OPEN_AI_KEY)
   return (
      <div className=" h-screen overflow-hidden flex">
         <Sidebar />
         <div className="w-full">
            <Navabr />
            <div className="p-4">
               <Outlet />
            </div>
         </div>
      </div>
   )
}
