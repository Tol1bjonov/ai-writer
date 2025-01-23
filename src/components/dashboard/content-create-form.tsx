import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Loader2 } from 'lucide-react'
import { ContentCreateRequestParam } from '../../shared/types/content-create-request-param'

type ContentCreateFormProps = {
   isLoading: boolean
   onSubmit: (params: ContentCreateRequestParam) => void
}

export default function ContentCreate({
   isLoading,
   onSubmit,
}: ContentCreateFormProps) {
   const [form, setForm] = useState<ContentCreateRequestParam>({
      title: '',
      description: '',
   })

   const handleChange = (
      event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = event.currentTarget
      console.log(name, value)
      setForm({ ...form, [name]: value })
   }

   const handleSubmit = (event: FormEvent) => {
      event.preventDefault()
      onSubmit(form)
   }

   return (
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
   )
}
