import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import OtpForm from './components/OtpForm.jsx';
import DragAndDropCards from './components/DragAndDropCards.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<OtpForm/>} />
    <Route path="otp-form" element={<OtpForm/>}></Route>
    <Route path ="course-list" element={<DragAndDropCards/>}></Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
