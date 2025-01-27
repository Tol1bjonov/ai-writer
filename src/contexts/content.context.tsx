import { createContext, FC, ReactNode, useState } from 'react'
import { TContentCreateRequestParam } from '../shared/types/content-create-request-param'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { generateArticle } from '../utils/openai'
import { TGeneratedContent } from '../shared/types/generated-content'
import { useLocalStorage } from 'react-use'
import { TPromtHistory, TPromtLink } from '../shared/types/promt-history.types'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

interface ICntentContext {
   generatingContent: boolean
   setGeneratingContent: (value: boolean) => void
   generateContent: (
      params: TContentCreateRequestParam
   ) => Promise<string | null>
   getPromptHistory: () => TPromtHistory[]
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
   const [contentItems, setContentItems] = useLocalStorage<TGeneratedContent[]>(
      'contentItems',
      []
   )

   const generateContent = async (params: TContentCreateRequestParam) => {
      let content = null
      getPromptHistory()
      setGeneratingContent(true)
      const { title, description } = params
      try {
         content = await generateArticle(title, description)
         if (content) {
            const generatedContentItem: TGeneratedContent = {
               id: uuidv4(),
               title,
               description,
               content,
               createdAt: new Date(),
            }
            setContentItems([generatedContentItem, ...(contentItems || [])])
         }
      } catch (error) {
         console.log('[Error] Failed to generate article', error)
         toast.error('Error occured while generating content')
      } finally {
         setGeneratingContent(false)
      }
      return content
   }

   const getPromptHistory = (): TPromtHistory[] => {
      if (!contentItems) {
         return []
      }

      const groupedItems = contentItems.reduce(
         (prev: { [date: string]: TPromtLink[] }, next) => {
            const date = dayjs(next.createdAt).format('MM DD, YYYY')
            if (!prev[date]) {
               prev[date] = []
            }
            prev[date].push({
               title: next.title,
               url: `./dashboard/content/${next.id}`,
            })
            return prev
         },
         {}
      )

      return Object.keys(groupedItems)
         .sort((a, b) => dayjs(b).diff(a))
         .map((date) => ({
            date,
            links: groupedItems[date],
         }))
   }

   return (
      <ContentContext.Provider
         value={{
            generatingContent,
            setGeneratingContent,
            generateContent,
            getPromptHistory,
         }}
      >
         {children}
      </ContentContext.Provider>
   )
}

export { ContentContextProvider, useContentContext }
