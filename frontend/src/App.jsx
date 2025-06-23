// frontend/src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import IncidentForm from './components/IncidentForm';
import UserProfileForm from './components/UserProfileForm';
import SOSButton from './components/SOSButton';
import AuthorityPage from './components/AuthorityPage';
import AuthorityLogin from './components/AuthorityLogin';
import './App.css';

function App() {
  const [isAuthorityLoggedIn, setIsAuthorityLoggedIn] = useState(false);

  return (
    <div>
      <nav>
        <Link to="/profile">User Profile</Link> |{' '}
        <Link to="/report">Report Incident</Link> |{' '}
        <Link to="/sos">SOS</Link> |{' '}
        <Link to="/authority/login">Authority</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/report" />} />
        <Route path="/profile" element={<UserProfileForm />} />
        <Route path="/report" element={<IncidentForm />} />
        <Route path="/sos" element={<SOSButton />} />

        {/* Authority Routes */}
        <Route
          path="/authority/login"
          element={<AuthorityLogin onLogin={() => setIsAuthorityLoggedIn(true)} />}
        />
        <Route
          path="/authority"
          element={
            isAuthorityLoggedIn ? (
              <AuthorityPage />
            ) : (
              <Navigate to="/authority/login" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<div>Welcome to the Incident Reporting System</div>} />
      </Routes>
    </div>
  );
}

export default App;

