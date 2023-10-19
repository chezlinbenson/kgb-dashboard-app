import { useEffect, useState } from "react";
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Dashboard.css";
import PaymentsTable from "../components/PaymentsTable";
import { Sidebar } from "../components/Sidebar"



const Dashboard = ({ currentUser, setCurrentUser }) => {

    const [users, setUsers] = useState([]);
    const [currentUserData, setCurrentUserData] = useState({
        "Email": "",
        "deb_id": 0,
        "Name": "",
        "Surname": "",
        "Password": "",
        "id": "",
        "Client Reference": ""
    });


    const fetchUserData = async () => {
        const db = getFirestore(app); // Assuming 'app' is already initialized
        const colRef = collection(db, "Debtors");

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
            // Access the currently logged-in user-
            const loggedInUser = currentUser;

            // Filter the data to find the user's data (change the condition based on your user identification)
            const userData = users.find((user) => user.Email === loggedInUser.email);

            if (userData) {
                console.log(loggedInUser);
                console.log(userData);
                console.log(userData.Email);
                console.log(userData.Surname);
                setCurrentUserData({ ...userData });
                console.log("CURRENT USER DATA HERE", currentUserData);

            }
        }
    }, [users, currentUser, currentUserData]);


    return (
        <section className="Dashboard-Main">
            < Sidebar currentUser={currentUser} />
            {/* Display the user data associated with the current user */}
            {Array.isArray([currentUserData]) ? (
                <div className="tableContainer">
                    <div className="tableTitle">Latest Transactions</div>
                    <PaymentsTable rows={[currentUserData]} />
                    console.log("What's Happening Here?")
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </section >

    );
};

export default Dashboard;