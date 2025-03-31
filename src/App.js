import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CoursePage from './Component/CoursePage.jsx';
import Home from './Component/Home.jsx';
import Login from './Component/Login.jsx';
import RegisterForm from './Component/RegisterForm.jsx';
import Authprovider from './Context/Authprovider.jsx';

const App = () => {
  return (
    <Authprovider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/courses' element={<CoursePage/>}/>
        </Routes>
      </Router>
    </Authprovider>
  );
}

export default App;
