import { useEffect, useState } from "react";
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Dashboard.css";
// import DebtorsTable from "../components/DebtorsTable";
import PaymentsTable from "../components/PaymentsTable";
import { Sidebar } from "../components/Sidebar"



const Dashboard = ({ currentUser, setCurrentUser }) => {

    const [debtors, setDebtors] = useState([]);
    const [payments, setPayments] = useState([]);
    // const [debts, setDebts] = useState([])
    const [currentDebtorsData, setCurrentDebtorsData] = useState({
        "Email": "",
        "Deb_id": 0,
        "Name": "",
        "Surname": "",
        "Password": "",
        "Id": "",
        "Client_reference": ""
    });
    const [currentPaymentsData, setCurrentPaymentsData] = useState([]);
    // const [currentDebtData, setCurrentDebtData] = useState({
    //     "Deb_id": 0,
    //     "Amount": 0,
    //     "Date": "",
    // });


    const fetchData = async () => {
        const db = getFirestore(app); // Assuming 'app' is already initialized
        const colRefDebtors = collection(db, "Debtors");
        const colRefPayments = collection(db, "Payments");
        // const colRefDebt = collection(db, "Debt");

        try {
            const snapshotDebtors = await getDocs(colRefDebtors);
            const debtorsData = snapshotDebtors.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDebtors(debtorsData);

            const snapshotPayments = await getDocs(colRefPayments);
            const paymentsData = snapshotPayments.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPayments(paymentsData);

            // const snapshotDebt = await getDocs(colRef);
            // const debtData = snapshotDebt.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // setDebt(debtData);

            console.log("Fetched user data:", debtorsData);
            console.log("Fetched user data:", paymentsData);
            // console.log("Fetched user data:", debtData);

        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (debtors.length > 0) {
            // Access the currently logged-in user-
            const loggedInUser = currentUser;

            // Filter the data to find the user's data (change the condition based on your user identification)
            const debtorsData = debtors.find((user) => user.Email === loggedInUser.email);

            if (debtorsData) {
                console.log(loggedInUser);
                console.log(debtorsData);
                console.log(debtorsData.Email);
                console.log(debtorsData.Surname);
                setCurrentDebtorsData({ ...debtorsData });
                const debtorsPaymentsData = payments.filter(payment => payment.Deb_id === debtorsData.Deb_id);
                setCurrentPaymentsData(debtorsPaymentsData);
                console.log("CURRENT USER DATA HERE", currentDebtorsData);
                console.log("CURRENT PAYMENT DATA HERE", currentPaymentsData);

            }
        }
    }, [debtors, currentUser, currentDebtorsData, currentPaymentsData, payments]);


    return (
        <section className="Dashboard-Main">
            < Sidebar currentUser={currentUser} />
            {/* Display the user data associated with the current user */}
            {Array.isArray(currentPaymentsData) ? (
                <div className="tableContainer">
                    <div className="tableTitle">Latest Transactions</div>
                    <PaymentsTable rows={currentPaymentsData} />
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </section >

    );
};

export default Dashboard;