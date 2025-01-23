import { useState } from 'react'
import { generateArticle } from '../utils/openai'
import ContentViewer from '../components/dashboard/content-viewer'
import ContentCreateForm from '../components/dashboard/content-create-form'
import { ContentCreateRequestParam } from '../shared/types/content-create-request-param'
import { useAppContext } from '../contexts/app.context'

export default function DashboardHome() {
   const { setGeneratingContent, generatingContent } = useAppContext()
   const [content, setContent] = useState<string | null>(null)

   const handleSubmit = async (param: ContentCreateRequestParam) => {
      setGeneratingContent(true)
      const { title, description } = param
      const result = await generateArticle(title, description)
      setContent(result)
      setGeneratingContent(false)
   }

   return (
      <div>
         <h1 className="text-3xl font-semibold">Artice Writer</h1>
         {content ? (
            <ContentViewer content={content} />
         ) : (
            <ContentCreateForm
               isLoading={generatingContent}
               onSubmit={handleSubmit}
            />
         )}
      </div>
   )
}
