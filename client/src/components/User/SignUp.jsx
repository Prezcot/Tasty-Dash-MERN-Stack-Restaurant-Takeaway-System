import SignIn from "./SignIn";
import axios from "axios";
import {useState,useEffect} from "react";
import styled from "styled-components";
import validator from 'validator';
import Menu from "../Menu/Menu";
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
    const [page,setPage]=useState();
    const [error,setError]=useState(null);

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

    async function handleSignUp(event)
    {
        event.preventDefault();
        try{
            setUsername(username.toLowerCase().trim());
            setPassword(password.trim());
            //var hashedpassword=bcrypt.hash(password,10);
            //setPassword(bcrypt.hash(password,10));
            if (username.length>=3 && validator.isEmail(email) && !isNaN(phonenumber) && phonenumber.length==10 && password.length>=3 && cnfrmpassword==password)
            {
                await axios.post("http://localhost:3001/users/signup",{username,email,phonenumber,password}).then(()=>setPage("Menu")).catch((err)=>setError(err.response.data.message));
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
            else{
                setError("Please Enter Valid Data");
            }
        }catch{
            setError("Please Enter Valid Data");    
        }  
    };
    if (page=="SignIn")
    {
        sessionStorage.setItem("page","SignIn");
        return <SignIn></SignIn>
    }
    if (page=="Menu")
    {
        sessionStorage.setItem("page","Menu");
        return <Menu></Menu>
    }
    else{
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
                            <p>Already a member ? <b style={{cursor:"pointer"}} onClick={()=>setPage("SignIn")}>Sign In</b></p>
                        </center>
                    </form>
                </div>
            </div>
            )
    }
}
export default SignUp