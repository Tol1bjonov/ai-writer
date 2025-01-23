import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Loader2 } from 'lucide-react'
import { generateArticle } from '../../utils/openai'
import ContentViewer from './content-viewer'

export default function ContentCreate() {
   const [isLoading, setIsloading] = useState(false)
   const [form, setForm] = useState({
      title: '',
      description: '',
   })

   const [content, setContent] = useState<string | null>(null)

   const handleSubmit = async (event: FormEvent) => {
      event.preventDefault()
      setIsloading(true)
      const result = await generateArticle(form.title, form.description)
      setContent(result)
      setIsloading(false)
   }

   const handleChange = (
      event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = event.currentTarget
      console.log(name, value)
      setForm({ ...form, [name]: value })
   }

   return (
      <div>
         <h1 className="text-3xl font-semibold">Artice Writer</h1>
         {content}
         {content ? (
            <ContentViewer content="content" />
         ) : (
            <form className="mt-4" onSubmit={handleSubmit}>
               <div className="grid w-full  gap-1.5 mb-4">
                  <Label htmlFor="title">Title</Label>
                  <Input
                     type="text"
                     id="title"
                     placeholder="Title"
                     name="title"
                     onChange={handleChange}
                     disabled={isLoading}
                  />
               </div>
               <div className="grid w-full gap-1.5 mb-4">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                     placeholder="Type your description here."
                     id="description"
                     name="description"
                     onChange={handleChange}
                     disabled={isLoading}
                  />
               </div>
               <Button disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />}
                  Generate
               </Button>
            </form>
         )}
      </div>
   )
}
