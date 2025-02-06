import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import { TContentCreateRequestParam } from '../../shared/types/content-create-request-param'
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
import { Textarea } from '../ui/textarea'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

type ContentCreateFormProps = {
   isLoading: boolean
   onSubmit: (params: TContentCreateRequestParam) => void
}

const formSchema = z.object({
   title: z.string().min(5).max(50),
   description: z.string().min(50).max(1000),
})

export default function ContentCreate({
   isLoading,
   onSubmit,
}: ContentCreateFormProps) {
   const { t } = useTranslation('dashboard')
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
            className="space-y-2 md:space-y-4 md:mt-4 mt-2"
         >
            <FormField
               control={form.control}
               name="title"
               disabled={isLoading}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t('title')}</FormLabel>
                     <FormControl>
                        <Input placeholder="ReactJS" {...field} />
                     </FormControl>
                     <FormDescription>{t('titleHint')}</FormDescription>
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
                     <FormLabel>{t('description')}</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder={t('descriptPlaceholder')}
                           {...field}
                           rows={5}
                        />
                     </FormControl>
                     <FormDescription>{t('descriptionHint')}</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button disabled={isLoading}>
               {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
               {t('generate')}
            </Button>
         </form>
      </Form>
   )
}
function setError(arg0: { title: string }) {
   throw new Error('Function not implemented.')
}
