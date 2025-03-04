import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Links from './applinks';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Links />
  </StrictMode>,
)
