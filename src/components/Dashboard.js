import { usersData } from "../firebase";
import "./Dashboard.css";
import { useState } from "react";



const Dashboard = () => {  

    const [users, setUser] = useState([]); 
    usersData.then(value => setUser(value))
    if(users.length > 0) {
      let username =  users.map(el => {
            return el.Email === "client1@kgb.com" && el === true && el;
        })
        console.log(username, "We Have Clients");
    }

    
   

    return(          
        <section className="Dashboard-Sidebar">
        <h1 className="dashboard-header">Dashboard</h1>
        <div className="Dashboard-Data">
           
        </div>        
        </section>       
    );
};

export default Dashboard;
