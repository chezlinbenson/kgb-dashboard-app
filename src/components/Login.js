import { useContext, useState } from "react";
import "./Login.css";
import Logo from "../assets/logo/kgb-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "./context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e)=> { 
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    console.log("userCredential", userCredential)
    const user = userCredential.user;
    dispatch({type:"LOGIN", payload:user})
    navigate("/")
    // ...
    })
    .catch((error) => {    
      setError(true)
    // ..
    });
    }

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
                <label for="email">Email<br />
                <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
                </label>
                <label for="password">Password<br />
                <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                </label>
                <button type="submit">Continue</button>
                {error && <span className="submit-error">Incorrect email or password</span>}
              </form>
            </div>
      </div>
      
    </section>
  );
};

export default Login;
