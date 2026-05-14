import { Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppShell } from './components/layout/AppShell';
import { PageTransition } from './components/layout/PageTransition';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleRoute } from './components/RoleRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import ConsumerDashboardPage from './pages/ConsumerDashboardPage';
import CropDetailsPage from './pages/CropDetailsPage';
import VerificationPage from './pages/VerificationPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <AppShell>
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/verify" element={<PageTransition><VerificationPage /></PageTransition>} />
        <Route path="/crops/:id" element={<PageTransition><CropDetailsPage /></PageTransition>} />
        <Route path="/farmer" element={<RoleRoute roles={[ 'farmer', 'admin' ]}><FarmerDashboardPage /></RoleRoute>} />
        <Route path="/consumer" element={<RoleRoute roles={[ 'consumer', 'admin' ]}><ConsumerDashboardPage /></RoleRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Navigate to="/farmer" replace /></ProtectedRoute>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  </AppShell>
);

export default App;
