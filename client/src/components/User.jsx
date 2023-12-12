import React from "react";
import NavBar from "./NavBar";
import styled from "styled-components";

const UserInput=styled.input`
  color:red;
  border: 1px solid grey;
  border-radius: 10px;
`;
export const User=()=>{
    var tempusername;
    var tempemail;
    var tempphonenumber;
    var tempaddress;
    var temppassword;
    var tempcnfrmpassword;

    function handleSubmit(event)
    {
        event.preventDefault();
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                Name: <UserInput type="text" id="name" placeholder="Name" onChange={(e)=>tempusername=e.target.value}/><br></br>
                Email: <UserInput type="text" id="email" placeholder="Email" onChange={(e)=>tempemail=e.target.value}/><br></br>
                Phone Number: <UserInput type="text" id="phonenumber" placeholder="Phone Number" onChange={(e)=>tempphonenumber=e.target.value}/><br></br>
                Address: <UserInput type="text" id="address" placeholder="Address" onChange={(e)=>tempaddress=e.target.value}/><br></br>
                Password: <UserInput type="password" id="password" placeholder="Password" onChange={(e)=>temppassword=e.target.value}/><br></br>
                Confirm Password: <UserInput type="password" id="confirmpassword" placeholder="Confirm Password" onChange={(e)=>tempcnfrmpassword=e.target.value}/><br></br>
                <input type="submit" value="Sign Up"></input>
            </form>
        </div>
    )
}
