import { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import SignIn from "./SignIn";
import NavBar from "../NavBar";
import axios from "axios";
function Dashboard() {
    const [page,setPage]=useState(false);
    const [userinfo,setUserInfo]=useState();
    useEffect(()=>{
        axios.get("http://localhost:3001/users/userinfo").then((res)=>setUserInfo(res.data.message)).catch((err)=>console.log(err));
    },[]);
    if (page)
    {
        sessionStorage.setItem("page","SignIn");
        return <SignIn></SignIn>
    }
  return (
    <div>
        <NavBar></NavBar>
        <div style={{display:"flex",flexDirection:"row",marginTop:"1vh",justifyContent:"space-between"}}>
            <div>
                Dashboard
                Name: {userinfo}
            </div>
            <div style={{marginRight:"1vh"}}>
                <button onClick={()=>setPage("SignIn")}>Log Out</button>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
