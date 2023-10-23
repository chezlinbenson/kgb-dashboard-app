import { useEffect, useState } from "react";
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Dashboard.css";
// import DebtorsTable from "../components/DebtorsTable";
import PaymentsTable from "../components/PaymentsTable";
import { Sidebar } from "../components/Sidebar"
import Widget from "../components/widget/Widget"
import Navbar from "../components/Navbar"





const Dashboard = ({ currentUser, setCurrentUser }) => {

    const [debtors, setDebtors] = useState([]);
    const [payments, setPayments] = useState([]);
    const [debts, setDebts] = useState([])
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
    const [currentDebtsData, setCurrentDebtsData] = useState([]);
    const [widgetsInfo, setWidgetsInfo] = useState([]);


    const fetchData = async () => {
        const db = getFirestore(app); // Assuming 'app' is already initialized
        const colRefDebtors = collection(db, "Debtors");
        const colRefPayments = collection(db, "Payments");
        const colRefDebts = collection(db, "Debt");

        try {
            const snapshotDebtors = await getDocs(colRefDebtors);
            const debtorsData = snapshotDebtors.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDebtors(debtorsData);

            const snapshotPayments = await getDocs(colRefPayments);
            const paymentsData = snapshotPayments.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPayments(paymentsData);

            const snapshotDebt = await getDocs(colRefDebts);
            const debtsData = snapshotDebt.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setDebts(debtsData);

            console.log("Fetched user data:", debtorsData);
            console.log("Fetched user data:", paymentsData);
            console.log("Fetched user data:", debtsData);

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
                setCurrentDebtorsData({ ...debtorsData });
                const debtorsPaymentsData = payments.filter(payment => payment.Deb_id === debtorsData.Deb_id);
                setCurrentPaymentsData(debtorsPaymentsData);
                console.log(currentPaymentsData)
                const debtorsDebtsData = debts.filter(debt => debt.Deb_id === debtorsData.Deb_id);
                setCurrentDebtsData(debtorsDebtsData);
            }

            //Data for Widgets
            console.log(currentPaymentsData)
            let totalPayed = currentPaymentsData.reduce((accum, current) => accum + current.Amount, 0)
            //console.log(totalPayed)
            let totalDue = currentDebtsData?.[0]?.Capital || 0;
            let totalExpenses = currentPaymentsData.reduce((accum, current) => accum + (current.Interest + current.Fees), 0)
            let monthlyTotals = [];
            currentPaymentsData.forEach(payment => {
                let expenses = currentDebtsData?.[0]?.Interest || 0 + currentDebtsData?.[0]?.Fees || 0;
                totalDue += expenses;
                totalDue -= payment.Amount;
                let totals = {
                    totPay: payment.Amount,
                    totDue: totalDue - expenses,
                    date: payment.Date
                }
                monthlyTotals.concat(totals)
            })

            let widgetData1 = {
                totalPayed: totalPayed,

            }

            let widgetData2 = {
                totalOwed: totalDue + totalPayed,
            }

            // let widgetData3 = {
            //     totalExpenses: totalExpenses,
            // }

            // let widgetData4 = {
            //     totalDue: totalDue,
            // }

            setWidgetsInfo([widgetData1, widgetData2]) //widgetData1, widgetData2
        }
    }, [debtors, currentUser, currentDebtorsData, currentPaymentsData, payments, debts, currentDebtsData, widgetsInfo]);


    return (
        <section className="Dashboard-Main">
            < Sidebar currentUser={currentDebtorsData} />
            <div className="Dashboard-Content">
                <Navbar />
                <h1 className="Welcome-User">Dashboard</h1>
                <p className="Welcome">Welcome Back,{currentDebtorsData.Name}</p>
                {/* Display the user data associated with the current user */}
                <div className="Widgets">
                    <Widget type="Payed" widgetData={widgetsInfo?.[0]?.totalPayed || 0} />
                    <Widget type="Owed" widgetData={widgetsInfo?.[1]?.totalOwed || 0} />
                    {/* <Widget type="Expenses" widgetData={widgetsInfo[2].totalExpenses} />
                    <Widget type="Due" widgetData={widgetsInfo[3].totalDue} /> */}
                </div>
                {Array.isArray(currentPaymentsData) ? (
                    <div className="tableContainer">
                        <div className="tableTitle">Latest Transactions</div>
                        <PaymentsTable rows={currentPaymentsData} />
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </section >

    );
};

export default Dashboard;