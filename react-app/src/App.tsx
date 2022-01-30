import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useUser } from "./hooks/useUser";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

function App() {
  const [loaded] = useUser();

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
