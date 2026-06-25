import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { TRPCProvider } from "@/providers/trpc"
import { BookingProvider } from "@/providers/BookingProvider"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TRPCProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </TRPCProvider>
  </BrowserRouter>,
)
