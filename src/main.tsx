import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './components/layout/index.tsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { InConstruction } from './pages/in-construction/in-construction.tsx'
import { NotFound } from './pages/404/404.tsx'
import { AttributeList } from './pages/attributes/attributes.tsx'
import { RaceList } from './pages/races/races.tsx'
import { Home } from './pages/home/home.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SkillList } from './pages/skills/skills.tsx'
import { SkillBonusList } from './pages/races/skill-bonus/skill-bonus.tsx'
import { SubRaceList } from './pages/races/sub-races/sub-races.tsx'
import { AttributeBonusList } from './pages/races/attribute-bonus/attribute-bonus.tsx'

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
              <Route index element={<RaceList />} />
              <Route path='sub-races' element={<SubRaceList />} />
              <Route path='sub-races/skill-bonus' element={<SkillBonusList />} />
              <Route path='sub-races/attribute-bonus' element={<AttributeBonusList />} />
            </Route>

            {/* Attributes */}
            <Route path='/attributes'>
              <Route index element={<AttributeList />} />
            </Route>

            {/* Skills */}
            <Route path='/skills'>
              <Route index element={<SkillList />} />
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
