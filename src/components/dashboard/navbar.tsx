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

export default function Navabr() {
   const { toggleSidebar } = useAppContext()
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
                  <DropdownMenuTrigger>Yusufjon</DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem>Profile</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </nav>
      </div>
   )
}
