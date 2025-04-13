import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import MyApp from './MyApp.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyApp />
  </StrictMode>
)

