import React, { useState,useEffect } from "react";
import NavBar from "/MyData/GitHub/restaurant-ordering-system/client/src/components/NavBar";
import styled from "styled-components";
import axios from "axios";
import SignUp from "./SignUp";
const UserInput=styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const Tabcol=styled.td`
    padding-bottom:2vh;
    font-size:4vh;
`;

const SignIn=()=>{ //you cant use export default here because you are assigning
    //an arrow function to it and you cant simultaneously export and assign.
    const [page,setPage]=useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [currentlychked,setChecked]=useState(null);

    useEffect(()=>{ //this useEffect hook will only run by default if the page variable has changed thus avoiding
        //the too many re-renders error.
        if (!localStorage.getItem("page") || localStorage.getItem("page")=="SignIn")
        {
            setPage("SignIn");
        }
        else if (localStorage.getItem("page")=="SignUp")
        {
            setPage("SignUp");
        }
        else{
            setPage("Menu");
        }
    });

    useEffect(()=>{
        if (!localStorage.getItem("checked"))
        {
            localStorage.setItem("checked","false");
            setChecked(false);
        }
        else if (localStorage.getItem("checked")=="true")
        {
            setUsername(localStorage.getItem("username"));
            setPassword(localStorage.getItem("password"));
            setChecked(true);
        }
    },[]);

    function changePage(newpage)
    {
        if (newpage=="Menu")
        {
            setPage("Menu");
            localStorage.setItem("page","Menu");
        }
        else if (newpage=="SignIn")
        {
            setPage("SignIn");
            localStorage.setItem("page","SignIn");
        }
        else if (newpage=="SignUp")
        {
            setPage("SignUp");
            localStorage.setItem("page","SignUp");
        }
    }
    async function handleSignIn(event)
    {
        console.log("signin");
        event.preventDefault();
        if (currentlychked==true)
        {
            localStorage.setItem("checked",JSON.stringify(currentlychked));
            localStorage.setItem("username",username);
            localStorage.setItem("password",password);

        }
        else{
            localStorage.setItem("checked",JSON.stringify(currentlychked));
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
        await axios.post("http://192.168.1.121:3001/users/signin",{username,email,phonenumber,password,cnfrmpassword}).then(()=>changePage("Menu"));
        
    }
    if (page=="SignIn")//use vh and vw for margins and padding and other attributes 
    {
        return(
            <div style={{"display":"flex","flex-direction":"column","align-items":"center"}}>
                <div style={{"margin-top":"5vh","border":"0.75vh solid black","padding":"2vh","border-radius":"15px"}}>
                    <center>
                        <h1 style={{color:"black"}}>Sign In</h1>
                    </center>
                    <br></br>
                    <form onSubmit={handleSignIn}>
                        <table id="login" >
                            <tr>
                                <Tabcol>Username: </Tabcol> 
                                <td style={{"padding-bottom":"2vh","font-size":"4vh"}}><input type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <Tabcol>Password: </Tabcol>
                                <Tabcol><input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/></Tabcol>
                            </tr>
                            <tr>
                                <td>
                                <input style={{width:"2vw",height:"2vh"}} type="checkbox" checked={currentlychked} onChange={(e)=>setChecked(e.target.checked)}></input>
                                <p style={{display:"inline",fontSize:"3vh"}}>Remember Me ?</p>
                                </td>
                            </tr>
                        </table>
                        <br></br>
                        <center>
                            <input style={{"width":"50%","background-color":"green","color":"white","border-radius":"10px","border":"0.1vh solid black"}} type="submit" value="Sign In"></input>
                            <p style={{cursor:"pointer"}} onClick={()=>changePage("SignUp")}><u>Create an account</u></p>
                        </center>
                    </form>
                </div>
            </div>
        )
    }
    if (page=="SignUp")
    {
        <SignUp />
    }
    if (page=="Menu")
    {
        return(
            <div>
                This is route to menu page
                <button id="back" onClick={changePage("SignIn")}>Go Back</button>
            </div>
        )
    }
}

export default SignIn;