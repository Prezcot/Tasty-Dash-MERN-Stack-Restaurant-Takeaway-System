import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import NavBar from "../NavBar";
import axios from "axios";
import styled from "styled-components";
import { Tab } from "bootstrap";
import {useNavigate } from 'react-router-dom';
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
    const [alertmsg,setAlertMsg]=useState(false);
    const username=sessionStorage.getItem("username");
    const nav = useNavigate();
    useEffect(()=>{
        async function getUserInfo()
        {
            //you have to use req.params to send over data/variables to the server when dealing with get requests as data cant be sent in the body
            await axios.get(`http://localhost:3001/users/userinfo/${username}`).then((res)=>setUserInfo(res.data)).catch((err)=>console.log(err));
        }
        getUserInfo();
    },[]);
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
    function handleAlert()
    {
      setAlertMsg(true);
    }
    async function handleDelete()
    {
      const username=sessionStorage.getItem("username");
      await axios.put("http://localhost:3001/users/deleteaccount",{username}).then(()=>nav("/signin")).catch((err)=>{console.log(err)});
    }
  return (
    // <div style={{background:`url("/images/UserDashboardBackground.jpg")`,width:"100vw",height:"100vh",backgroundRepeat:"no-repeat"}}></div>
    <div style={{background:`url("/images/MenuBackground.jpg")`,backgroundRepeat:"no-repeat",width: "100vw",height: "100vh",flexDirection:"row",backgroundSize:"cover"}}>
        <NavBar></NavBar>
        <div style={{display:"flex",flexDirection:"row",marginTop:"1vh",justifyContent:"space-evenly",color:"white",alignItems:"center",marginTop: "5vh",
          border: "0.4vh solid black",
          boxShadow: "0px 0px 10px 3px white",
          padding: "2vh",
          borderRadius: "15px",
          backgroundColor: "white",
          color: "white",
          marginRight:"5vw",
          marginLeft:"5vw",backgroundColor:"#32383f"}}>
            { !alertmsg ?
              (<div style={{flex:1}}>
                  <h1>Dashboard</h1>
                  <p style={{fontSize:"2vw",display:"inline"}}>Welcome, {userinfo.username}</p>
                  <br></br><br></br>
                  <p style={{fontSize:"1.5vw"}}>Username: {userinfo.username}</p>
                  <p style={{fontSize:"1.5vw"}}>Email: {userinfo.email}</p>
                  <p style={{fontSize:"1.5vw"}}>Phone Number: {userinfo.phonenumber}</p>
                  <button style={{backgroundColor: "red",color: "white",borderRadius: "10px",border: "0.1vh solid black"}} onClick={handleAlert}>Delete Account</button>
              </div>) : (<div style={{flex:1, justifyContent:"center",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                      <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
                        <h4>Are you sure ?</h4>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
                          <div style={{marginLeft:"-5vh"}}>
                            <button style={{marginLeft:"2vw",backgroundColor: "red",color: "white",borderRadius: "10px",border: "0.1vh solid black"}} onClick={handleDelete}>Yes</button>
                          </div>
                          <div style={{marginLeft:"2vh"}}>
                            <button style={{backgroundColor: "green",color: "white",borderRadius: "10px",border: "0.1vh solid black"}} onClick={()=>setAlertMsg(false)}>No</button>
                          </div>
                        </div>
                      </div>
                  </div>)
            }
            <div>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                  <button style={{backgroundColor: "green",color: "white",borderRadius: "10px",border: "0.1vh solid black"}} onClick={()=>{
                      nav("/signin")
                      sessionStorage.removeItem("username")
                      sessionStorage.removeItem("email")}}>Log Out</button>
                  <br></br>
                </div>
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
