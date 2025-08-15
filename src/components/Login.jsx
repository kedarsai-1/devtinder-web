import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login =()=>{
    const [emailId,setemailid] = useState("");
    const [Password,setPassword] = useState("");
    const[FirstName,setFirstName]= useState("");
    const[LastName,setLastName]=useState("");
    const[isLoginForm,setisLoginForm]=useState(false);
    const [error,seterror]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlesignup= async ()=>{
      try{
        const res= await axios.post(BASE_URL+"signup",{FirstName,LastName,emailId,Password},{withCredentials:true})
        dispatch(addUser(res.data))
        navigate("/profile")

      }catch(err){
        seterror(err?.response?.data || "Something Went Wrong")

      }
    }
    const handleLogin =async ()=>{
        try{
    const res = await axios.post(BASE_URL+"login",{
            emailId,
             Password
        },
      {
        withCredentials:true
      })
      console.log(res.data);
      dispatch(addUser(res.data))
      navigate('/');
      

    }

catch(err){
  seterror(err?.response?.data || "Something Went Wrong")
   
}
    }
    return(
      
        <div className="flex justify-center my-10">
<div className="card bg-base-200 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm? "Login":"SIGNUP"}</h2>
    <div className="my-4">
      {!isLoginForm &&(
      <>
    <fieldset className="fieldset my-2">
  <legend className="fieldset-legend">FirstName</legend>
  <input type="text" value={FirstName} className="input" placeholder="Type here"
  onChange={(e)=>{
    setFirstName(e.target.value)
  }}/>
 
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">LastName</legend>
  <input type="text" value={LastName} className="input" placeholder="Type here"
  onChange={(e)=>{
    setLastName(e.target.value)
  }}/>
 
</fieldset>
</>
      )
}

<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Email id</legend>
  <input type="text" value={emailId} className="input" placeholder="Type here"
  onChange={(e)=>{
    setemailid(e.target.value)
  }}/>
 
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" value={Password} className="input" placeholder="Type here"
 onChange={(e)=>{
    setPassword(e.target.value)
  }}/>
 
</fieldset>

    </div>
    
   <p className="text-red-500">{error} </p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handlesignup}>{isLoginForm? "Login":"SIGNUP"}</button>
    </div>
    <p className="cursor-pointer"onClick={()=>setisLoginForm((value=> !value))}>{isLoginForm?"New User? SIGNUP HERE":"Existing User? Login Here"} </p>
  </div>
</div>
        </div>
    )
}
export default Login