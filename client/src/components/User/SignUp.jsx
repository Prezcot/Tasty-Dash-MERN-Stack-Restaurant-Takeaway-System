import SignIn from "./SignIn";
import axios from "axios";
import {useState,useEffect} from "react";
import styled from "styled-components";
const UserInput=styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const Tabcol=styled.td`
    padding-bottom:2vh;
    font-size:4vh;
`;

function SignUp()
{
    const [email,setEmail]=useState();
    const [phonenumber,setPhoneNumber]=useState();
    const [cnfrmpassword,setCnfrmPassword]=useState();
    const [signupusername,setSignUpUsername]=useState();
    const [signuppassword,setSignUpPassword]=useState();
    const [page,setPage]=useState();

    async function handleSignUp(event)
    {
        console.log("registering");
        event.preventDefault();
        await axios.post("http://192.168.1.121:3001/users/signup",{signupusername,email,phonenumber,signuppassword,cnfrmpassword}).then(()=><SignIn/>);
        
    }
    if (page=="SignIn")
    {
        localStorage.setItem("page","SignIn");
        return <SignIn></SignIn>
    }
    else{
        return(
            <div style={{"display":"flex","flex-direction":"column","align-items":"center"}}>
                <div style={{"margin-top":"5vh","border":"0.75vh solid black","padding":"2vh","border-radius":"15px"}}>
                    <center>
                        <h1 style={{color:"black"}}>Sign Up</h1>
                    </center>
                    <br></br>
                    <form onSubmit={handleSignUp}>
                        <table id="signup" >
                            <tr>
                                <Tabcol>Username: </Tabcol> 
                                <td style={{"padding-bottom":"2vh","font-size":"4vh"}}><input type="text" placeholder="Username" onChange={(e)=>setSignUpUsername(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <Tabcol>Email: </Tabcol>
                                <Tabcol><input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Phone Number: </Tabcol>
                                <Tabcol><input type="password" placeholder="Phone Number" onChange={(e)=>setPhoneNumber(e.target.value)}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Password: </Tabcol>
                                <Tabcol><UserInput type="password" placeholder="Password" onChange={(e)=>setSignUpPassword(e.target.value)}/></Tabcol>
                            </tr>
                            <tr>
                                <Tabcol>Confirm Password: </Tabcol>
                                <Tabcol><UserInput type="password" placeholder="Confirm Password" onChange={(e)=>setCnfrmPassword(e.target.value)}/></Tabcol>
                            </tr>
                        </table>
                        <br></br>
                        <center>
                            <input style={{"width":"50%","background-color":"green","color":"white","border-radius":"10px","border":"1px solid black"}} type="submit" value="Sign Up"></input>
                            <p>Already a member ? <b style={{cursor:"pointer"}} onClick={()=>setPage("SignIn")}>Sign In</b></p>
                        </center>
                    </form>
                </div>
            </div>
            )
    }
}
export default SignUp