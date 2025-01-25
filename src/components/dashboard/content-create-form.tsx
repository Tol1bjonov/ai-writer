import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import { ContentCreateRequestParam } from '../../shared/types/content-create-request-param'
;('use client')

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form'

type ContentCreateFormProps = {
   isLoading: boolean
   onSubmit: (params: ContentCreateRequestParam) => void
}

const formSchema = z.object({
   title: z.string().min(5).max(50),
   description: z.string().min(50).max(1000),
})

export default function ContentCreate({
   isLoading,
   onSubmit,
}: ContentCreateFormProps) {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: '',
         description: '',
      },
   })

   const handleSubmit = (values: z.infer<typeof formSchema>) => {
      onSubmit(values)
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
         >
            <FormField
               control={form.control}
               name="title"
               disabled={isLoading}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Title</FormLabel>
                     <FormControl>
                        <Input placeholder="ReactJS" {...field} />
                     </FormControl>
                     <FormDescription>
                        Please, provide a title for your content!
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="description"
               disabled={isLoading}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Description</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Write about ReactJS form validation. Provide a real life examples."
                           {...field}
                        />
                     </FormControl>
                     <FormDescription>
                        Please, provide a title for your content!
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button disabled={isLoading}>
               {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
               Submit
            </Button>
         </form>
      </Form>
   )
}
function setError(arg0: { title: string }) {
   throw new Error('Function not implemented.')
}
