import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuthContext } from '../../contexts/auth.context'

export default function Hero() {
   const { user } = useAuthContext()
   return (
      <div className="bg-white">
         <header className="fixed inset-x-0 top-0 z-50 bg-white">
            <nav
               className="flex items-center justify-between p-6 lg:px-8"
               aria-label="Global"
            >
               <div>
                  <Link to="/" className="-m-1.5 p-1.5 font-semibold">
                     AI Writer Assistant
                  </Link>
               </div>
               {user ? (
                  <Link
                     to="/dashboard"
                     className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2"
                  >
                     Dashboard <ArrowRightIcon className="h-4 w-4" />
                  </Link>
               ) : (
                  <Link
                     to="/auth/login"
                     className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2"
                  >
                     Log in <ArrowRightIcon className="h-4 w-4" />
                  </Link>
               )}
            </nav>
            <hr />
         </header>
         <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-32">
               <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                     AI Writer Assistant: Your Ultimate Creative Sidekick
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                     Transforming Your Writing Expereince with Cutting-Edge AI
                     Support, Crafted to Inspire Briliance and Boost
                     Productivity.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                     {user ? (
                        <Link to="/dashboard">
                           <Button size="lg">Go to the Dashboard</Button>
                        </Link>
                     ) : (
                        <Link to="/auth/register">
                           <Button size="lg">Get Started</Button>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
