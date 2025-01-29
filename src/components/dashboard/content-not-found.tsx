import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export default function ContentNotFound() {
   return (
      <Alert variant={'destructive'}>
         <AlertCircle className="h-4 w-4" />
         <AlertTitle>Content Not Found</AlertTitle>
         <AlertDescription>Please provide a valide ID!</AlertDescription>
      </Alert>
   )
}
