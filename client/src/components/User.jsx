import React, { useState,useEffect } from "react";
import NavBar from "./NavBar";
import styled from "styled-components";
import axios from "axios";

const UserInput=styled.input`
  border: 1px solid grey;
  border-radius: 10px;
`;
const Tabcol=styled.td`
    padding-bottom:2%;
    font-size:30px;
`;

const User=()=>{ //you cant use export default here because you are assigning
    //an arrow function to it and you cant simultaneously export and assign.
    var username;
    var email;
    var phonenumber;
    var address;
    var password;
    var cnfrmpassword;
    const [page,setPage]=useState();
    useEffect(()=>{ //this useEffect hook will only run by default if the page variable has changed thus avoiding
        //the too many re-renders error.
        if (!localStorage.getItem("page") || localStorage.getItem("page")=="User")
        {
            localStorage.setItem("page","User");
            setPage("User");
        }
        else if (localStorage.getItem("page")=="Menu")
        {
            localStorage.setItem("page","Menu");
            setPage("Menu");
        }
    });
    function changePage()
    {
        if (page=="User")
        {
            setPage("Menu");
            localStorage.setItem("page","Menu");
        }
        else if (page=="Menu")
        {
            setPage("User");
            localStorage.setItem("page","User");
        }
    }
    async function handleSubmit(event)
    {
        console.log("registering");
        event.preventDefault();
        await axios.post("http://192.168.1.120:3001/register",{username,email,phonenumber,address,password,cnfrmpassword}).then(changePage);
        
    }
    if (page=="User")
    {
        return(
            <div style={{"margin-top":"2%","display":"flex"}}>
                <div style={{"border-right":"5px solid black","margin-left":"6%","padding-right":"5%"}}>
                    <h1 style={{color:"black"}}>Sign In</h1>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <table id="login">
                            <tr>
                                <Tabcol>Name: </Tabcol> 
                                <td style={{"padding-bottom":"2%","padding-left":"5px","font-size":"30px"}}><UserInput type="text" id="name" placeholder="Name" onChange={(e)=>username=e.target.value}/></td>
                            </tr>
                            <tr>
                                <Tabcol>Email: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="text" id="email" placeholder="Email" onChange={(e)=>email=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
        
                            </tr>
                            <tr>
                                <Tabcol>Phone Number: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="text" id="phonenumber" placeholder="Phone Number" onChange={(e)=>phonenumber=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Address: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="text" id="address" placeholder="Address" onChange={(e)=>address=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Password: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="password" id="password" placeholder="Password" onChange={(e)=>password=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Confirm Password: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="password" id="confirmpassword" placeholder="Confirm Password" onChange={(e)=>cnfrmpassword=e.target.value}/></Tabcol>
                            </tr>
                            <input style={{"width":"50%","background-color":"grey","color":"white","border-radius":"10px","border":"1px solid black"}} type="submit" value="Sign In"></input>
                        </table>
                    </form>
                </div>
                <div style={{"padding-left":"5%"}}>
                <h1 style={{color:"black"}}>Sign Up</h1>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <table id="login">
                            <tr>
                                <Tabcol>Name: </Tabcol> 
                                <td style={{"padding-bottom":"2%","padding-left":"5px","font-size":"30px"}}><UserInput type="text" id="name" placeholder="Name" onChange={(e)=>username=e.target.value}/></td>
                            </tr>
                            <tr>
                                <Tabcol>Email: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="text" id="email" placeholder="Email" onChange={(e)=>email=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
        
                            </tr>
                            <tr>
                                <Tabcol>Phone Number: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="text" id="phonenumber" placeholder="Phone Number" onChange={(e)=>phonenumber=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Address: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="text" id="address" placeholder="Address" onChange={(e)=>address=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Password: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="password" id="password" placeholder="Password" onChange={(e)=>password=e.target.value}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Confirm Password: </Tabcol>
                                <Tabcol style={{"padding-left":"5px"}}><UserInput type="password" id="confirmpassword" placeholder="Confirm Password" onChange={(e)=>cnfrmpassword=e.target.value}/></Tabcol>
                            </tr>
                            <input style={{"width":"50%","background-color":"grey","color":"white","border-radius":"10px","border":"1px solid black"}} type="submit" value="Sign Up"></input>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
    if (page=="Menu")
    {
        return(
            <div>
                This is the menu page
                <button id="back" onClick={changePage}>Go Back</button>
            </div>
        )
    }
}

export default User;