import { useState } from "react"
import axios from "axios";

const Login =()=>{
    const [emailId,setemailid] = useState("");
    const [Password,setPassword] = useState("");
    const handleLogin =async ()=>{
        try{
    const res = await axios.post("http://localhost:4000/login",{
            emailId,
             Password
        })

    }

catch(err){
    console.log(err);
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
   
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
        </div>
    )
}
export default Login