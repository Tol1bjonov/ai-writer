import { Loader2, PencilRulerIcon } from 'lucide-react'
import PropmtHistory from './promt-history'
import { useAppContext } from '../../contexts/app.context'
import { useContentContext } from '../../contexts/content.context'
import { Link } from 'react-router-dom'

export default function Sidebar() {
   const { sidebarOpen } = useAppContext()
   const { generatingContent, getPromptHistory } = useContentContext()
   const historyItems = getPromptHistory()
   const classes = sidebarOpen ? 'w-1/2 border-r p-2' : 'w-0'
   return (
      <nav
         className={`transition-all duration-500 overflow-x-hidden h-screen md:w-80 md:border-r md:p-4 md:p-2 ${classes}`}
      >
         <div className=" flex items-center justify-between">
            <h1 className=" text-xl font-semibold">AI Writer</h1>
            {generatingContent ? (
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
               <Link to={'/dashboard'}>
                  <PencilRulerIcon className="w-6 h-6" />
               </Link>
            )}
         </div>

         <PropmtHistory items={historyItems} />
      </nav>
   )
}
