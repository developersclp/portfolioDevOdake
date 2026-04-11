import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import MeusProjetos from './pages/admin/MeusProjetos';
import Skills from './pages/admin/Skills';
import ProfileSettings from './pages/admin/ProfileSettings';
import Mensagens from './pages/admin/Mensagens';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
            </Route>

            {/* Fallback Auth/Login Route without MainLayout */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
               <Route index element={<AdminDashboard />} />
               <Route path="projects" element={<MeusProjetos />} />
               <Route path="skills" element={<Skills />} />
               <Route path="profile" element={<ProfileSettings />} />
               <Route path="messages" element={<Mensagens />} />
            </Route>
          </Routes>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
