import { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo/kgb-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from "react-router-dom";

const Login = ({ setCurrentUser }) => {

  
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          const user = userCredential.user;
          console.log("Logged in user:", user);
          console.log(user.email)
          setCurrentUser(user);
          navigate("/");
        }
      })
      .catch((error) => {
        setError(true);
      });
  };
  

  return (
    <section className="Login-Section">
      <div className="Login-Flex">
        <div className="Login-Welcome">
          <img src={Logo} alt="KGB Law logo" className="px-4" />
          <div className="Login-Content">
              <h1>Start Your <br /> Journey With Us.</h1>
              <p>Elevating Financial Freedom: <br />
              Your Best Debt Settlement Partner.
              </p>
          </div>
            
        </div>
          
            <div className="Login-Form-Section">
              <h2>
                Login
              </h2>
              <p className="form-register">Don’t have an account? <span>Register</span></p>
              <form  className="Login-Form" onSubmit={handleLogin}> 
                <label htmlFor="email">Email<br />
                <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password">Password<br />
                <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                </label>
                <button type="submit">Log in</button>
             
                {error && <span className="submit-error">Incorrect email or password</span>}
              </form>
            </div>
      </div>
      
    </section>
  );
};

//export const userEmail = userCredential.user.email;
export default Login;