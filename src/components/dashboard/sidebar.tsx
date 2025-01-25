import { Loader2, PencilRulerIcon } from 'lucide-react'
import PropmtHistory from './promt-history'
import { TPromtHistory } from '../../shared/types/promt-history.types'
import { useAppContext } from '../../contexts/app.context'

const mockItems: TPromtHistory[] = [
   {
      date: 'Today',
      links: [
         {
            title: 'Prompt 1',
            url: './dashboard/prompt/1',
         },
         {
            title: 'Prompt 2',
            url: './dashboard/prompt/2',
         },
      ],
   },
   {
      date: 'Yesterday',
      links: [
         {
            title: 'Prompt 1',
            url: './dashboard/prompt/1',
         },
         {
            title: 'Prompt 2',
            url: './dashboard/prompt/2',
         },
      ],
   },
]

export default function Sidebar() {
   const { generatingContent, sidebarOpen } = useAppContext()
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
               <button>
                  <PencilRulerIcon className="w-6 h-6" />
               </button>
            )}
         </div>

         <PropmtHistory items={mockItems} />
      </nav>
   )
}
