import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { removeUserFromfeed } from "../utils/feedSlice";
const Usercard = (props)=>{
  const [Err,seterr]=useState('');
 const dispatch = useDispatch();
const {user} =props; 
const handleSendRequest =async (status,userId)=>{
  try{
  const  res = await axios.post(BASE_URL+"request/send/"+status+"/"+userId,{},{withCredentials:true})
    dispatch(removeUserFromfeed(userId))
  }
  catch(err){
    seterr(err);
    console.log(Err)

  }
}
return(
<div className="card bg-base-300 w-96 shadow-sm">
  <figure className="h-60 w-full overflow-hidden bg-base-100">
    <img
      src={user.photoUrl}
      alt="User photo"
      className="w-full h-full object-contain" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.FirstName +" " + user.LastName}</h2>
    
    {user.age && user.gender &&(<p>{user.age +" " + user.gender}</p>)}
    <p>{user.about}</p>
    <div className="card-actions justify-center my-4">
    <button className="btn btn-secondary"onClick={()=>handleSendRequest("ignored",user._id)}>Ignore</button>
      <button className="btn btn-primary"onClick={()=>handleSendRequest("interested",user._id)}>Interested</button>
    </div>
  </div>
</div>
)
}
export default Usercard;