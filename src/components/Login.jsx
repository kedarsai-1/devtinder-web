import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login =()=>{
    const [emailId,setemailid] = useState("");
    const [Password,setPassword] = useState("");
    const [error,seterror]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    <h2 className="card-title">Login</h2>
    <div className="my-4">
    <fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Email id</legend>
  <input type="text" value={emailId} className="input" placeholder="Type here"
  onChange={(e)=>{
    setemailid(e.target.value)
  }}/>
 
</fieldset>
<fieldset className="fieldset my-2">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" value={Password} className="input" placeholder="Type here"
 onChange={(e)=>{
    setPassword(e.target.value)
  }}/>
 
</fieldset>

    </div>
   <p className="text-red-500">{error} </p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
        </div>
    )
}
export default Login