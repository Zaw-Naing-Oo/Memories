import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';

const App = () => {

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route  path='/auth' element={<Auth />} />
      </Routes>
    </Container>
  )
}

export default App
