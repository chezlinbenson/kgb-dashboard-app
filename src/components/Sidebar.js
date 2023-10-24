import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "./Sidebar.css";
import Logo from "../assets/logo/kgb-logo.png";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';



const handleLogout = ({ currentUser, setCurrentUser }) => {
    signOut(auth)
        .then(() => {
            // Successfully signed out
            // You can also clear the user state if needed
            setCurrentUser(null);
        })
        .catch((error) => {
            // Handle any sign-out errors
            console.error("Error while signing out:", error);
        });
};


export const Sidebar = () => {
    return (

        <div className="Dashboard-Sidebar">
            <img src={Logo} alt="KGB Law logo" className="px-4" />
            <ul>
                <li><a>Dashboard</a></li>
                <li><a>Debt</a></li>
                <li><a>Make Payment</a></li>
                <li><a>Notifications</a></li>
                <li><a>Settings</a></li>
                <li><a className="Dash-LogOut" onClick={handleLogout}>Log Out</a></li>
            </ul>
        </div>
    )
};