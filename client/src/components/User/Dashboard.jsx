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
const TabCol = styled.td`
  padding-bottom: 2vh;
  font-size: 3vh;
`;
function Dashboard() {
    const [page,setPage]=useState(false);
    const [user_info,setUserInfo]=useState({});
    const [current_password,setCurrentPassword]=useState(null);
    const [new_password,setNewPassword]=useState(null);
    const [confirm_password,setConfirmPassword]=useState(null);
    const [error,setError]=useState(null);
    const [alert_msg,setAlertMsg]=useState(false);
    const username=sessionStorage.getItem("username");
    const token=sessionStorage.getItem("token");
    const nav = useNavigate();
    useEffect(()=>{
        async function getUserInfo()
        {
            //you have to use req.params to send over data/variables to the server when dealing with get requests as data cant be sent in the body
            try{
              await axios.get(`http://localhost:3001/users/userinfo/${username}`,{ headers: { Authorization: `Bearer ${token}` }}).then((res)=>{sessionStorage.setItem("username",res.data.username)
              setUserInfo(res.data)}).catch((err)=>console.log(err));
            }catch{
              console.log("error");
            }
        }
        getUserInfo();
    },[]);
    function handleError() {
        //also called a render method
        if (error && error!="Password Successfully Changed") {
          return (
            <center>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "0.1vh solid red",
                  borderRadius: "1vh",
                  paddingTop: "2vh",
                  paddingLeft: "2vh",
                  paddingRight: "2vh",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "normal",
                    color: "red",
                  }}
                >
                  {error}
                </p>
              </div>
            </center>
          );
        }
        else if (error=="Password Successfully Changed")
        {
          return (
            <center>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "0.1vh solid green",
                  borderRadius: "1vh",
                  paddingTop: "2vh",
                  paddingLeft: "2vh",
                  paddingRight: "2vh",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "normal",
                    color: "green",
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
        if (current_password && new_password && confirm_password)
        {   
            if (current_password.length>=5 || new_password.length>=5)
            {
                if(confirm_password==new_password)
                { try{
                    await axios.put("http://localhost:3001/users/checkpassword",{username,current_password,new_password}).then((res)=>setError(res.data.message)).catch((err)=>setError(err.response.data.message));
                  }catch{
                    console.log("error");
                    }
                } 
                else{
                    setError("Passwords Not Matching");
                }
            }
            else{
                setError("Please Enter A Password Above 4 Characters");
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
      await axios.delete(`http://localhost:3001/users/deleteaccount/${username}`).then((res)=>{
      sessionStorage.setItem("alert_msg",res.data.message); 
      sessionStorage.removeItem("token"); 
      nav("/signin")}).catch((err)=>{sessionStorage.setItem("alert_msg",err.response.data.message)});
    }
  return (
    // <div style={{background:`url("/images/UserDashboardBackground.jpg")`,width:"100vw",height:"100vh",backgroundRepeat:"no-repeat"}}></div>
    <div style={{background:`url("/images/MenuBackground.jpg")`,backgroundRepeat:"no-repeat",width: "100vw",height: "100vh",flexDirection:"row",backgroundSize:"cover", paddingTop: '5%'}}>
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
            { !alert_msg ?
              (<div style={{flex:1}}>
                  <h1>Dashboard</h1>
                  <p style={{fontSize:"2vw",display:"inline"}}>Welcome, {user_info.username}</p>
                  <br></br><br></br>
                  <p style={{fontSize:"1.5vw"}}>Username: {user_info.username}</p>
                  <p style={{fontSize:"1.5vw"}}>Email: {user_info.email}</p>
                  <p style={{fontSize:"1.5vw"}}>Phone Number: {user_info.phone_number}</p>
                  <button style={{backgroundColor: "red",color: "white",borderRadius: "0.5vh",border: "0.1vh solid black",fontSize:"2vh"}} onClick={handleAlert}>Delete Account</button>
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
                {handleError()}
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <TabCol>
                                <p style={{fontSize:"1.5vw",paddingTop:"2vh"}}>Current Password:</p>
                            </TabCol>
                            <TabCol>
                                <UserInput type="password" placeholder="Current Password" onChange={(e)=>setCurrentPassword(e.target.value)}/>
                            </TabCol>
                        </tr>
                        <tr>
                            <TabCol>
                                <p style={{fontSize:"1.5vw",paddingTop:"2vh"}}>New Password:</p>
                            </TabCol>
                            <TabCol>
                                <UserInput type="password" placeholder="New Password" onChange={(e)=>setNewPassword(e.target.value)}/>
                            </TabCol>
                        </tr>
                        <tr>
                            <TabCol>
                                <p style={{fontSize:"1.5vw",paddingTop:"2vh"}}>Confirm Password:</p>
                            </TabCol>
                            <TabCol>
                                <UserInput type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                            </TabCol>
                        </tr>
                            <TabCol>
                                <input style={{fontSize:"2vh",backgroundColor: "green",color: "white",borderRadius: "0.5vh",border: "0.1vh solid black",}} type="submit" value="Change Password"></input>
                            </TabCol>
                    </table>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
