import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormMessage } from '../ui/form'
import { z } from 'zod'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '../ui/card'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuthContext } from '../../contexts/auth.context'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const formSchema = z.object({
   login: z.string().min(5).max(20),
   password: z.string().min(4),
})

export default function Login() {
   const navigate = useNavigate()
   const { loginUser } = useAuthContext()
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         login: '',
         password: '',
      },
   })

   const handleSubmit = (values: z.infer<typeof formSchema>) => {
      const { login, password } = values
      try {
         loginUser(login, password)
         toast.success('Login successfull')
         navigate('/dashboard')
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message)
         }
      }
   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <Card className="max-w-md mx-auto">
               <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">
                     Login to your account
                  </CardTitle>
                  <CardDescription>
                     Enter your login and password to login to your account
                  </CardDescription>
               </CardHeader>
               <CardContent className="grid gap-4">
                  <FormField
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Login</FormLabel>
                           <FormControl>
                              <Input placeholder="mylogin" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                     name="login"
                     control={form.control}
                  />
                  <FormField
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input type="password" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                     name="password"
                     control={form.control}
                  />
               </CardContent>
               <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full">Login</Button>
                  <Link to="/auth/register" className="text-center block">
                     Don't have an account? Register now!
                  </Link>
               </CardFooter>
            </Card>
         </form>
      </Form>
   )
}
