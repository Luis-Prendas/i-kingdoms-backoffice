import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './components/layout/index.tsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { InConstruction } from './pages/in-construction/in-construction.tsx'
import { NotFound } from './pages/404/404.tsx'
import { AttributeList } from './pages/attributes/list/attribute-list.tsx'
import { RaceList } from './pages/races/list/race-list.tsx'
import { Home } from './pages/home/home.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SkillList } from './pages/skills/list/skill-list.tsx'
import { SubRaceList } from './pages/races/sub-races/list/sub-race-list.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout><Outlet /></Layout>}>
            {/* Ruta principal */}
            <Route path='/' element={<Home />} />

            {/* Races */}
            <Route path='/races'>
              <Route path='race-list' element={<RaceList />} />
              <Route path='sub-races/sub-race-list' element={<SubRaceList />} />
            </Route>

            {/* Attributes */}
            <Route path='/attributes'>
              <Route path='attribute-list' element={<AttributeList />} />
            </Route>

            {/* Skills */}
            <Route path='/skills'>
              <Route path='skill-list' element={<SkillList />} />
            </Route>

            {/* Others */}
            <Route path='/in-construction' element={<InConstruction />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
