import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TGeneratedContent } from '../shared/types/generated-content'
import { useContentContext } from '../contexts/content.context'
import ContentViewer from '../components/dashboard/content-viewer'
import { StarIcon } from 'lucide-react'
import clsx from 'clsx'

export default function DashboardFunction() {
   const [generatedContent, setGeneratedContent] = useState<TGeneratedContent>()
   const { getContentById, updateById } = useContentContext()
   const { id = '' } = useParams<{ id: string }>()

   useEffect(() => {
      if (id) {
         const result = getContentById(id)
         setGeneratedContent(result)
      }
   }, [id, getContentById])

   const handleSave = (generateContent: TGeneratedContent) => {
      updateById(generateContent.id, generateContent)
   }

   if (!generatedContent) {
      return (
         <div>
            <h1>Not found</h1>
         </div>
      )
   }

   const handleChange = (rate: number) => {
      if (generatedContent) {
         handleSave({
            ...generatedContent,
            rate,
         })
      }
   }

   return (
      <div>
         <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold">{generatedContent.title}</h1>
            <div className="flex gap-1">
               {Array(5)
                  .fill(0)
                  .map((_, index) => (
                     <StarIcon
                        key={index}
                        onClick={() => handleChange(index + 1)}
                        className={clsx(
                           'w-8 h-8 cursor-pointer',
                           (generatedContent.rate || 0) > index && 'fill-black'
                        )}
                     />
                  ))}
            </div>
         </div>
         <ContentViewer
            generatedContent={generatedContent}
            key={generatedContent.id}
            onSave={handleSave}
         />
      </div>
   )
}
