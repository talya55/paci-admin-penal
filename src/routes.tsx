import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NavbarPage from './pages/NavbarPage';
import CircularPage from './pages/CircularPage';
import PaciNewsPage from './pages/PaciNewsPage';
import PaciServicesPage from './pages/PaciServicesPage';
import DailyNewsPage from './pages/DailyNewsPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './context/PrivateRoute';
import PaciWebPage from './pages/paciWebPage';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<LoginPage />} />

    {/* Protected Routes */}
    <Route element={<PrivateRoute element={<Sidebar />} />}>
      <Route path="/" element={<Navigate to="/navbar" />} />
      <Route path="/navbar" element={<NavbarPage />} />
      <Route path="/circular" element={<CircularPage />} />
      <Route path="/news" element={<PaciNewsPage />} />
      <Route path="/services" element={<PaciServicesPage />} />
      <Route path="/daily-news" element={<DailyNewsPage />} />
      <Route path="/web-links" element={<PaciWebPage />} />

    </Route>

    {/* Redirect unknown routes */}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
