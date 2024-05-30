import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Screen Pages
import Display from "./Display";
import NotFoundPage from './NotFoundPage';

const App = () => {
  return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Display/>}/>
            <Route path="/posting/:userId"/>
            <Route path='*' element={<NotFoundPage/>}/>
         </Routes>
      </BrowserRouter>
  )
}

export default App