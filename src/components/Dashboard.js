import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { app } from "../firebase";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import "./Dashboard.css";
import { signOut } from "firebase/auth";
import PaymentsTable from "./PaymentsTable";


const Dashboard = ({ currentUser, setCurrentUser }) => {

    const [users, setUsers] = useState([]);
    const [currentUserData, setCurrentUserData] = useState(null);

    const fetchUserData = async () => {
        const db = getFirestore(app); // Assuming 'app' is already initialized
        const colRef = collection(db, "Users");

        try {
            const snapshot = await getDocs(colRef);
            const userData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUsers(userData);
            console.log("Fetched user data:", userData);
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            // Access the currently logged-in user
            const loggedInUser = currentUser;

            // Filter the data to find the user's data (change the condition based on your user identification)
            const userData = users.find((user) => user.email === loggedInUser.email);

            if (userData) {
                console.log(loggedInUser);
                console.log(userData);
                console.log(userData.Email);
                console.log(userData.Surname);
                setCurrentUserData(userData);
                console.log("CURRENT USER DATE HERE", currentUser);
            }
        }
    }, [users, currentUser]);



    const handleLogout = () => {
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


    return (
        <section className="Dashboard-Sidebar">
            <div>
                <ul>
                    <li>
                        <a>Dashboard</a>
                    </li>
                    <li>
                        <a>News</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                    <li className="log-out-btn">
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            </div>

            <div className="Dashboard-Data">
                {/* Display the user data associated with the current user */}
                {Array.isArray(users) ? (
                    <PaymentsTable rows={users} />
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </section>
    );
};

export default Dashboard;