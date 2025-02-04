import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { Bars3Icon } from '@heroicons/react/16/solid'
import { useAppContext } from '../../contexts/app.context'
import { useAuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'

export default function Navabr() {
   const navigate = useNavigate()
   const { toggleSidebar } = useAppContext()
   const { user, logoutUser } = useAuthContext()

   const handleLogout = () => {
      logoutUser()
      navigate('auth/login')
   }

   return (
      <div className="border-b">
         <nav className="flex items-center justify-between p-4 h-16">
            <div className="flex items-center gap-2">
               <Button
                  className="block md:hidden"
                  variant="outline"
                  onClick={toggleSidebar}
               >
                  <Bars3Icon className="w-4 h-4" />
               </Button>

               <h4 className="font-semibold">Dashboard</h4>
            </div>
            <div>
               <DropdownMenu>
                  <DropdownMenuTrigger>{user?.login}</DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem>Profile</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handleLogout}>
                        Logout
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </nav>
      </div>
   )
}
