import './App.css'
import { Button } from './components/ui/button'

function App() {
   console.log(import.meta.env.VITE_OPEN_AI_KEY)
   return <Button variant="destructive">Button</Button>
}

export default App
