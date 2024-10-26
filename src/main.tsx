import './styles/index.css'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './components/layout/index.tsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/home.tsx'
import { InConstruction } from './pages/in-construction/in-construction.tsx'
import { NotFound } from './pages/404/404.tsx'
import { AttributeList } from './pages/attributes/list/attribute-list.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas con Layout específico */}
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path='/home' element={
            <Suspense fallback={<>Cargando...</>}>
              <Home />
            </Suspense>
          } />
          <Route path='/in-construction' element={
            <Suspense fallback={<>Cargando...</>}>
              <InConstruction />
            </Suspense>
          } />
          <Route path='/not-found' element={
            <Suspense fallback={<>Cargando...</>}>
              <NotFound />
            </Suspense>
          } />
          <Route path='/attributes/attribute-list' element={
            <Suspense fallback={<>Cargando...</>}>
              <AttributeList />
            </Suspense>
          } />

          <Route path="*" element={
            <Suspense fallback={<>Cargando...</>}>
              <NotFound />
            </Suspense>
          } />
        </Route>

        {/* Rutas con otro Layout o sin Layout */}
        <Route path="/login" element={<>login</>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
