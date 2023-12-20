import { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import SignIn from "./SignIn";
import NavBar from "../NavBar";
import axios from "axios";
import styled from "styled-components";
import { Tab } from "bootstrap";
const UserInput = styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const Tabcol = styled.td`
  padding-bottom: 2vh;
  font-size: 3vh;
`;
function Dashboard() {
    const [page,setPage]=useState(false);
    const [userinfo,setUserInfo]=useState({});
    const [currentpassword,setCurrentPassword]=useState(null);
    const [newpassword,setNewPassword]=useState(null);
    const [confirmpassword,setConfirmPassword]=useState(null);
    const [error,setError]=useState(null);
    const username=sessionStorage.getItem("username");

    useEffect(()=>{
        async function getUserInfo()
        {
            await axios.get(`http://localhost:3001/users/userinfo/${username}`).then((res)=>setUserInfo(res.data)).catch((err)=>console.log("get isnt workin"+err));
        }
        getUserInfo();
    },[]);
    if (page)
    {
        sessionStorage.setItem("page","SignIn");
        return <SignIn></SignIn>
    }
    else{
        sessionStorage.setItem("page","Dashboard");
    }
    function handleError() {
        //also called a render method
        if (error) {
          return (
            <center>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "0.5vh solid red",
                  borderRadius: "3vh",
                  paddingTop: "2vh",
                  paddingLeft: "2vh",
                  paddingRight: "2vh",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {error}
                </p>
              </div>
            </center>
          );
        }
      }
    async function handleSubmit(event)
    {
        event.preventDefault();
        if (currentpassword && newpassword && confirmpassword)
        {   
            if (currentpassword.length>=5 || newpassword.length>=5)
            {
                if(confirmpassword==newpassword)
                {
                    await axios.put("http://localhost:3001/users/checkpassword",{username,currentpassword,newpassword}).then((res)=>setError(res.data.message)).catch((err)=>setError(err.response.data.message));
                }
                else{
                    setError("Passwords Not Matching");
                }
            }
            else{
                setError("Please Enter Password Above 8 Characters");
            }
        }
        else{
            setError("Please Enter Valid Data");
        }
    }
    async function handleDelete()
    {
        console.log(username);
        await axios.put("http://localhost:3001/users/deleteaccount",username).then((res)=>console.log(res.data)).catch((err)=>{console.log(err)});
    }
  return (
    // <div style={{background:`url("/images/UserDashboardBackground.jpg")`,width:"100vw",height:"100vh",backgroundRepeat:"no-repeat"}}></div>
    <div>
        <NavBar></NavBar>
        <div style={{display:"flex",flexDirection:"row",marginTop:"1vh",justifyContent:"space-between"}}>
            <div>
                <h1>Dashboard</h1>
                <p style={{fontSize:"2vw",display:"inline"}}>Welcome, {userinfo.username}</p>
                <br></br><br></br>
                <p style={{fontSize:"1.5vw"}}>Username: {userinfo.username}</p>
                <p style={{fontSize:"1.5vw"}}>Email: {userinfo.email}</p>
                <p style={{fontSize:"1.5vw"}}>Phone Number: {userinfo.phonenumber}</p>
                <button style={{backgroundColor: "red",color: "white",borderRadius: "10px",border: "0.1vh solid black"}} onClick={handleDelete}>Delete Account</button>
            </div>
            <div style={{marginRight:"0.5vw"}}>
                <button style={{marginLeft:"23vw",backgroundColor: "green",color: "white",borderRadius: "10px",border: "0.1vh solid black"}} onClick={()=>setPage("SignIn")}>Log Out</button>
                <br></br>
                {handleError()}
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <Tabcol>
                                <p style={{fontSize:"1.5vw",paddingTop:"2vh"}}>Current Password:</p>
                            </Tabcol>
                            <Tabcol>
                                <UserInput type="password" placeholder="Current Password" onChange={(e)=>setCurrentPassword(e.target.value)}/>
                            </Tabcol>
                        </tr>
                        <tr>
                            <Tabcol>
                                <p style={{fontSize:"1.5vw",paddingTop:"2vh"}}>New Password:</p>
                            </Tabcol>
                            <Tabcol>
                                <UserInput type="password" placeholder="New Password" onChange={(e)=>setNewPassword(e.target.value)}/>
                            </Tabcol>
                        </tr>
                        <tr>
                            <Tabcol>
                                <p style={{fontSize:"1.5vw",paddingTop:"2vh"}}>Confirm Password:</p>
                            </Tabcol>
                            <Tabcol>
                                <UserInput type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                            </Tabcol>
                        </tr>
                            <Tabcol>
                                <input style={{width: "100%",backgroundColor: "green",color: "white",borderRadius: "10px",border: "0.1vh solid black",}} type="submit" value="Change Password"></input>
                            </Tabcol>
                    </table>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
