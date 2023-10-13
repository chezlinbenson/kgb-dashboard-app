
import './App.css';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import { useContext } from 'react';
import { AuthContext } from './components/context/AuthContext';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Dashboard />
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
