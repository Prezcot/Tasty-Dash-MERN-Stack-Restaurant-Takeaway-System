import SignIn from "./SignIn";
import axios from "axios";
import {useState,useEffect} from "react";
import styled from "styled-components";
import validator from 'validator';
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router";
const UserInput=styled.input`
  border: 1px solid grey;
  border-radius: 1vh;
`;
const Tabcol=styled.td`
    padding-bottom:2vh;
    font-size:3vh;
`;

function SignUp()
{
    const [email,setEmail]=useState();
    const [phonenumber,setPhoneNumber]=useState();
    const [cnfrmpassword,setCnfrmPassword]=useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(null);
    sessionStorage.removeItem("password");
    const nav = useNavigate();
    function handleError() //also called a render method
    {
        if (error)
        {
            return(
                <center>
                    <div style={{"display":"inline-flex","align-items":"center","border":"0.5vh solid red","border-radius":"3vh","padding-top":"2vh","padding-left":"2vh","padding-right":"2vh"}}>
                        <p style={{"text-align":"center","font-weight":"bold","color":"red"}}>{error}</p>
                    </div>
                </center>
            )
        }
    }
    function checkForSpecialChar(password)
    {
        const regex=/[`!,.@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
        return regex.test(password);
    }
    function checkForUpperCase(password)
    {
        const regex=/[A-Z]/;
        return regex.test(password);
    }
    function checkForLowerCase(password)
    {
        const regex=/[a-z]/;
        return regex.test(password);
    }
    async function handleSignUp(event)
    {
        event.preventDefault();
        try{
            setUsername(username.toLowerCase().trim());
            setPassword(password.trim());
            
            //var hashedpassword=bcrypt.hash(password,10);
            //setPassword(bcrypt.hash(password,10));
            if (checkForLowerCase(password) && checkForUpperCase(password) && checkForSpecialChar(password) && username.length>=3 && validator.isEmail(email) && !isNaN(phonenumber) && phonenumber.length==10 && password.length>=5 && cnfrmpassword==password)
            {
                await axios.post("http://localhost:3001/users/signup",{username,email,phonenumber,password}).then(()=>{
                    sessionStorage.setItem("username", username)
                    nav("/menu")}).catch((err)=>setError(err.response.data.message));
            }
            else if (!checkForSpecialChar(password))
            {
                setError("Password Must Contain A Special Character");
            }
            else if (!checkForLowerCase(password))
            {
                setError("Password Must Contain A Lower Case Character");
            }
            else if (!checkForUpperCase(password))
            {
                setError("Password Must Contain A Upper Case Character");
            }
            else if (!username.length>=3)
            {
                setError("Please Enter Username Between 3 And 12 Characters");
            }
            else if (isNaN(phonenumber))
            {
                setError("Please Enter A Valid Phone Number");
            }
            else if (password!=cnfrmpassword)
            {
                setError("Passwords Not Matching");
            }
            else if (!validator.isEmail(email))
            {
                setError("Invalid Email");
            }
            else if (phonenumber.length!=10)
            {
                setError("Please Enter Phone Number With 10 Digits");
            }
            else if(password.length<5)
            {
                setError("Please Enter Password Above 4 Characters")
            }
            else{
                setError("Please Enter Valid Data");
            }
        }catch{
            setError("Please Enter Valid Data");    
        }  
    };
    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",backgroundImage:`url("/images/LoginBackground.jpg")`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat:"no-repeat",
        width:"100vw",
        height:"100vh",}}>
            <div style={{marginTop:"5vh",border:"0.4vh solid black",boxShadow:"0px 0px 10px 3px white",padding:"2vh",borderRadius:"15px",backgroundColor:"white",
            opacity:"93%"}}>
                <center>
                    <h1 style={{color:"black"}}>Sign Up</h1>
                </center>
                <br></br>
                {handleError()}
                <br></br>
                <form onSubmit={handleSignUp}>
                    <table id="signup" >
                        <tr>
                            <Tabcol>Username: </Tabcol> 
                            <td style={{paddingBottom:"1vh",fontSize:"3vh"}}><UserInput type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <Tabcol>Email: </Tabcol>
                            <Tabcol><UserInput type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/></Tabcol>
                        </tr>
                        <tr>
                            <Tabcol>Phone Number: </Tabcol>
                            <Tabcol><UserInput type="text" placeholder="Phone Number" onChange={(e)=>setPhoneNumber(e.target.value)}/></Tabcol>
                        </tr>
                        <tr>
                            <Tabcol>Password: </Tabcol>
                            <Tabcol><UserInput type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/></Tabcol>
                        </tr>
                        <tr>
                            <Tabcol>Confirm Password: </Tabcol>
                            <Tabcol><UserInput type="password" placeholder="Confirm Password" onChange={(e)=>setCnfrmPassword(e.target.value)}/></Tabcol>
                        </tr>
                    </table>
                    <br></br>
                    <center>
                        <input style={{width:"50%",backgroundColor:"green","color":"white",borderRadius:"10px",border:"0.1vh solid black"}} type="submit" value="Sign Up"></input>
                        <p>Already a member ? <b style={{cursor:"pointer"}} onClick={()=>nav("/signin")}>Sign In</b></p>
                    </center>
                </form>
            </div>
        </div>
        )
}
export default SignUp