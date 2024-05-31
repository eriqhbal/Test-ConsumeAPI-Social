import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Screen Pages
import Display from "./Display";
import NotFoundPage from './NotFoundPage';
import PostingUser from './PostingUser';

const App = () => {
  return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Display/>}/>
            <Route path="/posting/:userId" element={<PostingUser/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
         </Routes>
      </BrowserRouter>
  )
}

export default App