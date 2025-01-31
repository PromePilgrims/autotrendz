import { Sidebar } from './components/Sidebar'
import { Routes } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex justify-center items-center relative text-zinc-600">
        <Sidebar />
        <Routes />
      </div>
    </QueryClientProvider>
  )
}

export default App
