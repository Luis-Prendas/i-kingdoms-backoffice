import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './components/layout/index.tsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/home.tsx'
import { InConstruction } from './pages/in-construction/in-construction.tsx'
import { NotFound } from './pages/404/404.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas con Layout específico */}
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path='/home' element={<Home />} />
          <Route path='/in-construction' element={<InConstruction />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rutas con otro Layout o sin Layout */}
        <Route path="/login" element={<>login</>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
