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
                const debtorsDebtsData = debts.filter(debt => debt.Deb_id === debtorsData.Deb_id);
                setCurrentDebtsData(debtorsDebtsData);
            }

            //Data for Widgets
            let totalPayed = currentPaymentsData.reduce((accum, current) => accum + current.Amount, 0)
            let totalDue = currentDebtsData[0].Capital;
            let monthlyTotals = [];
            currentPaymentsData.forEach(payment => {
                let expenses = currentDebtsData[0].Interest + currentDebtsData[0].Fees;
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
                totalPay: totalPay,
                totalDue: totalDue
            }

            let widgetData2 = {
                totalDue: totalDue,
                totalDebtsData: currentDebtsData
            }

            let widgetData3 = {
                monthlyData: monthlyData
            }

            setWidgetsInfo([widgetData1, widgetData2, widgetData3])
        }
    }, [debtors, currentUser, currentDebtorsData, currentPaymentsData, payments, debts, currentDebtsData, widgetsInfo]);

    //new array with just dates
    // let capital = currentDebtsData.Capital
    // let amountOwed = capital;
    // let datesArray = currentPaymentsData.filter(item => item.Date);
    // let paymentsArray = currentPaymentsData.filter(item => item.Amount);


    // let debtsArray = currentDebtsData.filter(item => {

    //     let expenses = item.Fees + item.Interest.
    //         amountOwed - expenses

    //     return amountOwed

    // });


    return (
        <section className="Dashboard-Main">
            < Sidebar currentUser={currentDebtorsData} />
            <div className="Dashboard-Content">
                <Navbar />
                <h1 className="Welcome-User">Dashboard</h1>
                <p className="Welcome">Welcome Back,{currentDebtorsData.Name}</p>
                {/* Display the user data associated with the current user */}
                <div className="Widgets">
                    <Widget type="Payed" widgetData={widgetsInfo[0]} />
                    <Widget type="Due" widgetData={widgetsInfo[1]} />
                    <Widget type="Summary" widgetData={widgetsInfo[2]} />
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