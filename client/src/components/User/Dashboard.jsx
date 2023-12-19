import { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import SignIn from "./SignIn";
import NavBar from "../NavBar";

function Dashboard() {
    const [page,setPage]=useState(false);
    if (page)
    {
        localStorage.setItem("page","SignIn");
        return <SignIn></SignIn>
    }
  return (
    <div>
      <NavBar></NavBar>
      Dashboard
      <button onClick={()=>setPage("SignIn")}>Log Out</button>
    </div>
  );
}

export default Dashboard;
