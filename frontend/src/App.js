// frontend/src/App.js
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import EditPostPage from './pages/EditPostPage';
import AdminPage from './pages/AdminPage';

function App() {
  const location = useLocation();
  const isSplashPage = location.pathname === '/';

  return (
    <ThemeProvider>
      <>
        {!isSplashPage && <Nav />}
        <Routes>
      {/* Public routes — anyone can visit */}
      <Route path='/' element={<SplashPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/blog' element={<BlogPage />} />
      <Route path='/posts/:id' element={<PostPage />} />
      {/* Public routes with redirect: if logged in, go to /home */}
      <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path='/about' element={<PublicRoute><AboutPage /></PublicRoute>} />
      <Route path='/contact' element={<ContactPage />} />
      {/* Protected routes — must be logged in */}
      <Route path='/profile'
      element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path='/edit-post/:id'
      element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
      {/* Admin only — redirects members/guests to home */}
      <Route path='/admin'
       element={<ProtectedRoute role='admin'><AdminPage /></ProtectedRoute>}/>
     </Routes>
      </>
    </ThemeProvider>
  );
}
export default App;