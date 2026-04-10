import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import DPIAView from './components/Dashboard/DPIAView';
import TIAView from './components/Dashboard/TIAView';
import PoliciesView from './components/Dashboard/PoliciesView';
import DataBreachView from './components/Dashboard/DataBreachView';
import TrainingsView from './components/Dashboard/TrainingsView';
import PrivacyTeamView from './components/Dashboard/PrivacyTeamView';
import GuidanceView from './components/Dashboard/GuidanceView';
import PublicHub from './components/PublicHub';

// Auth Context — session persisted in localStorage
export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const SESSION_KEY = "vastint_privacy_auth";

function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-vastintPrimary selection:text-white">
      <Navbar />
      <PublicHub />
    </div>
  );
}

const ProtectedDashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <DashboardLayout />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(SESSION_KEY) === "1"
  );

  const login = () => {
    localStorage.setItem(SESSION_KEY, "1");
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page Hub */}
          <Route path="/" element={<LandingPage />} />

          {/* Mock Login */}
          <Route path="/login" element={<Login />} />

          {/* SaaS Dashboard */}
          <Route path="/dashboard" element={<ProtectedDashboard />}>
            {/* Default dashboard view — Privacy Team */}
            <Route index element={<PrivacyTeamView />} />
            {/* Subpages */}
            <Route path="privacy-team" element={<PrivacyTeamView />} />
            <Route path="guidance" element={<GuidanceView />} />
            <Route path="policies" element={<PoliciesView />} />
            <Route path="trainings" element={<TrainingsView />} />
            <Route path="dpias" element={<DPIAView />} />
            <Route path="tias" element={<TIAView />} />
            <Route path="data-breach" element={<DataBreachView />} />
            <Route path="settings" element={<div className="p-8">Settings Area</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
