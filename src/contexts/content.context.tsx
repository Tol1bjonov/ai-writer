import { createContext, FC, ReactNode, useState } from 'react'
import { TContentCreateRequestParam } from '../shared/types/content-create-request-param'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { generateArticle } from '../utils/openai'
import { TGeneratedContent } from '../shared/types/generated-content'

interface ICntentContext {
   generatingContent: boolean
   setGeneratingContent: (value: boolean) => void
   generateContent: (
      params: TContentCreateRequestParam
   ) => Promise<string | null>
}

export const ContentContext = createContext<ICntentContext | null>(null)

const useContentContext = () => {
   const context = useContext(ContentContext)
   if (!context) {
      throw new Error('Cotent context must be used whithin a Content Provider')
   }
   return context
}

interface IProps {
   children: ReactNode
}

const ContentContextProvider: FC<IProps> = ({ children }) => {
   const [generatingContent, setGeneratingContent] = useState(false)

   const generateContent = async (params: TContentCreateRequestParam) => {
      let content = null
      setGeneratingContent(true)
      const { title, description } = params
      try {
         content = await generateArticle(title, description)
         if (content) {
            const generatedContentItem: TGeneratedContent = {
               id: '12345',
               title,
               description,
               content,
               createdAt: new Date(),
            }
            localStorage.setItem(
               'contentItems',
               JSON.stringify([generatedContentItem])
            )
         }
      } catch (error) {
         console.log('[Error] Failed to generate article', error)
         toast.error('Error occured while generating content')
      } finally {
         setGeneratingContent(false)
      }
      return content
   }

   return (
      <ContentContext.Provider
         value={{
            generatingContent,
            setGeneratingContent,
            generateContent,
         }}
      >
         {children}
      </ContentContext.Provider>
   )
}

export { ContentContextProvider, useContentContext }
