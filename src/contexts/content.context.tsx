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
   ) => Promise<TGeneratedContent | null>
   getPromptHistory: () => TPromtHistory[]
   getContentById: (id: string) => TGeneratedContent
   updateById: (id: string, generateContent: TGeneratedContent) => void
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
      let generatedContent: TGeneratedContent | null = null
      setGeneratingContent(true)
      const { title, description } = params
      try {
         const content = await generateArticle(title, description)
         if (content) {
            generatedContent = {
               id: uuidv4(),
               title,
               description,
               content,
               createdAt: new Date(),
            }
            setContentItems([generatedContent, ...(contentItems || [])])
         }
      } catch (error) {
         console.log('[Error] Failed to generate article', error)
         toast.error('Error occured while generating content')
      } finally {
         setGeneratingContent(false)
      }
      return generatedContent
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
               url: `/dashboard/content/${next.id}`,
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

   const getContentById = (id: string) => {
      const generatedContent = contentItems?.find((item) => item.id === id)
      if (!generateContent) {
         throw new Error('Content not found')
      }
      return generateContent
   }

   const updateById = (id: string, generateContent: TGeneratedContent) => {
      const updatedContentItems = contentItems?.map((item) => {
         if (item.id === id) {
            return generateContent
         }
         return item
      })
      setContentItems(updatedContentItems || [])
   }

   return (
      <ContentContext.Provider
         value={{
            generatingContent,
            setGeneratingContent,
            generateContent,
            getPromptHistory,
            getContentById,
            updateById,
         }}
      >
         {children}
      </ContentContext.Provider>
   )
}

export { ContentContextProvider, useContentContext }
