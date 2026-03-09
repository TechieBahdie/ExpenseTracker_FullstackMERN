import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";

import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

// Landing page component for root "/"
const LandingPage = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Welcome to Expense Tracker</h1>
    <p>Manage your income and expenses easily.</p>
    <div style={{ marginTop: "20px" }}>
      <a href="/login" style={{ marginRight: "10px" }}>Login</a>
      <a href="/signUp">Sign Up</a>
    </div>
  </div>
);

// Route guard to protect authenticated routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // replace with your auth logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUpForm />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute>
                <Expense />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route to redirect unknown URLs to landing */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;