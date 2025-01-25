import { ClipboardIcon, ShareIcon, StarIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import Markdown from 'react-markdown'
import toast from 'react-hot-toast'

type ContentViewerProps = {
   content: string
}

export default function ContentViewer({ content }: ContentViewerProps) {
   const handleCopy = async () => {
      try {
         await navigator.clipboard.writeText(content)
         toast.success('Successfully copied to clipboard')
      } catch (e) {
         console.error('[Error] Failed to copy clipboard', e)
         console.error('Error occured while copied to clipboard')
      }
   }

   return (
      <Card className="mt-4">
         <CardContent className="p-4 md:p-6 lg:p-8">
            <div className="prose lg:prose-xl">
               <Markdown>{content}</Markdown>
            </div>
         </CardContent>
         <CardFooter className="flex gap-2 justify-end">
            <Button variant="outline">
               <ShareIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleCopy}>
               <ClipboardIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline">
               <StarIcon className="h-4 w-4" />
            </Button>
            <Button>Deploy</Button>
         </CardFooter>
      </Card>
   )
}
