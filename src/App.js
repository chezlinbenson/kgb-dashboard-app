import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  }

  // Pass down setCurrentUser to child components (Login and Dashboard) to update the authentication state.

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
            <Route
              index
              element={
                <RequireAuth>
                  <Dashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </RequireAuth>
              }
            />

          </Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;