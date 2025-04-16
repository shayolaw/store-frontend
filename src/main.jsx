import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import MyApp from './MyApp.jsx'
import { Provider } from 'react-redux'
import { store,persistor } from './store.js'
import { BrowserRouter } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'


const root = document.getElementById('root')
if(root){
createRoot(root).render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
  <StrictMode>
    <MyApp />
  </StrictMode>
  </BrowserRouter>
  </PersistGate>
  </Provider>
)
}

