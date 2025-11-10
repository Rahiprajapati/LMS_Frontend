import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminCourses from './Component/AdminCourses.jsx';
import AdminRoute from './Component/AdminRoute.jsx';
import CourseDetail from './Component/CourseDetail.jsx';
import CoursePage from './Component/CoursePage.jsx';
import Footer from './Component/Footer.jsx';
import Home from './Component/Home.jsx';
import Login from './Component/Login.jsx';
import MyCourses from './Component/MyCourses.jsx';
import NavBar from './Component/NavBar.jsx';
import Profile from './Component/Profile.jsx';
import ProtectedRoute from './Component/ProtectedRoute.jsx';
import RegisterForm from './Component/RegisterForm.jsx';
import VideoGallery from './Component/VideoGallery.jsx';
import Authprovider from './Context/Authprovider.jsx';

const App = () => {
  return (
    <Authprovider>
      <Router>
        <NavBar />
        <main className="app-main">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<RegisterForm/>}/>
            <Route path='/courses' element={<ProtectedRoute><CoursePage/></ProtectedRoute>} />
            <Route path='/courses/:id' element={<ProtectedRoute><CourseDetail/></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
            <Route path='/my-courses' element={<ProtectedRoute><MyCourses/></ProtectedRoute>} />
            <Route path='/videos' element={<ProtectedRoute><VideoGallery/></ProtectedRoute>} />
            <Route path='/admin/courses' element={<AdminRoute><AdminCourses/></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </Authprovider>
  );
}

export default App;
