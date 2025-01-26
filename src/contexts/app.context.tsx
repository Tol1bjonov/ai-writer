import { ReactNode, useContext, useState, createContext, FC } from 'react'

interface IAppContext {
   sidebarOpen: boolean
   toggleSidebar: () => void
}

const AppContext = createContext<IAppContext | null>(null)

const useAppContext = () => {
   const context = useContext(AppContext)
   if (!context) {
      throw new Error('App context must be within a AppProvider ')
   }
   return context
}

interface IProps {
   children: ReactNode
}

const AppContextProvider: FC<IProps> = ({ children }) => {
   const [sidebarOpen, setSidebarOpen] = useState(false)
   const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen)
   }

   return (
      <AppContext.Provider
         value={{
            sidebarOpen,
            toggleSidebar,
         }}
      >
         {children}
      </AppContext.Provider>
   )
}
export { AppContextProvider, useAppContext }
