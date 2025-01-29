import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TGeneratedContent } from '../shared/types/generated-content'
import { useContentContext } from '../contexts/content.context'
import ContentViewer from '../components/dashboard/content-viewer'

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
   return (
      <div>
         <h1 className="text-3xl font-semibold">{generatedContent.title}</h1>
         <ContentViewer
            generatedContent={generatedContent}
            key={generatedContent.id}
            onSave={handleSave}
         />
      </div>
   )
}
