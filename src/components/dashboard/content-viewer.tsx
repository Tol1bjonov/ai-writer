import { ClipboardIcon, Pencil, ShareIcon, StarIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import toast from 'react-hot-toast'
import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { TGeneratedContent } from '../../shared/types/generated-content'

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '../ui/tooltip'

type ContentViewerProps = {
   generatedContent: TGeneratedContent
   onSave: (generateContent: TGeneratedContent) => void
}

enum Mode {
   View,
   Edit,
}

export default function ContentViewer({
   generatedContent,
   onSave,
}: ContentViewerProps) {
   const [editedContent, setEditedContent] = useState<string>(
      generatedContent.content
   )
   const [mode, setMode] = useState<Mode>(Mode.View)

   const handleCopy = async () => {
      try {
         await navigator.clipboard.writeText(generatedContent.content)
         toast.success('Successfully copied to clipboard')
      } catch (e) {
         console.error('[Error] Failed to copy clipboard', e)
         console.error('Error occured while copied to clipboard')
      }
   }
   const handleEdit = () => {
      setMode(Mode.Edit)
   }
   const handleContentChange = (value?: string) => {
      setEditedContent(value || '')
   }
   const handleCancel = () => {
      setMode(Mode.View)
      setEditedContent(generatedContent.content)
   }
   const handleSave = () => {
      onSave({ ...generatedContent, content: editedContent })
      setMode(Mode.View)
   }

   return mode === Mode.View ? (
      <Card className="mt-4">
         <CardContent className="p-4 md:p-6 lg:p-8">
            <MDEditor.Markdown
               source={editedContent}
               style={{ whiteSpace: 'pre-wrap' }}
            />
         </CardContent>
         <CardFooter className="flex gap-2 justify-end">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" onClick={handleEdit}>
                        <Pencil className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Edit</p>
                  </TooltipContent>
               </Tooltip>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline">
                        <ShareIcon className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Share</p>
                  </TooltipContent>
               </Tooltip>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline" onClick={handleCopy}>
                        <ClipboardIcon className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Copy</p>
                  </TooltipContent>
               </Tooltip>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="outline">
                        <StarIcon className="h-4 w-4" />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Rate</p>
                  </TooltipContent>
               </Tooltip>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button>Deploy</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Deploy</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </CardFooter>
      </Card>
   ) : (
      <div>
         <MDEditor
            height={400}
            className="mt-4"
            value={editedContent}
            onChange={handleContentChange}
         />
         <div className="mt-4 flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="destructive" onClick={handleCancel}>
               Cancel
            </Button>
         </div>
      </div>
   )
}
