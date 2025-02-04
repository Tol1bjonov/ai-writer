import { Outlet } from 'react-router-dom'

export default function Authlayout() {
   return (
      <div className="h-screen grid md:grid-cols-2">
         <div className="bg-black text-white px-4 py-10 hidden md:flex justify-between flex-col">
            <h2 className="text-3xl mb-3">AI assistant</h2>
            <p>
               “This library has saved me countless hours of work and helped me
               deliver stunning designs to my clients faster than ever before.”
            </p>
         </div>
         <div className="flex items-center px-4">
            <Outlet />
         </div>
      </div>
   )
}
