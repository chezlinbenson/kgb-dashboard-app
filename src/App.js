
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
            

            
            {/* <Route index element={<RequireAuth><Login /></RequireAuth>} />
            <Route path="/" />
            <Route path="Login" element={<Login /> }/>
            <Route path="Dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="*" element={<RequireAuth><Login /></RequireAuth>} /> */}

            
          
        </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
