import "./New.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

//Set Table Data

const New = ({inputs, title}) => {
    const [file, setFile] = useState("");

    return(
        <div class="New">
            <Sidebar />
            <Navbar />
        </div>
    )
}