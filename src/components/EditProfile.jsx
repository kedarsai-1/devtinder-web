import { useState } from "react";
import Usercard from "./Usercard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
const EditProfile =({user})=>{
    
    const [FirstName,setFirstName] = useState(user?.FirstName || "");
    const [LastName,setLastName] = useState(user?.LastName || "");
    const [age,setage]= useState(user?.age || "");
    const [gender,setgender]=useState(user?.gender || "");
    const [about,setabout] = useState(user?.about || "");
    const [photoUrl,setphotoUrl] = useState(user?.photoUrl || "");
    const [error,seterror]=useState("");
    const [showtoast,setshowtoast]=useState(false);

    const dispatch = useDispatch();
    const saveProfile =async()=>{
        //clear errors
        seterror("")
   
       
        try{
            const res = await axios.patch(BASE_URL+"profile/edit",{
                FirstName,LastName,age,gender,about,photoUrl

            },{
               withCredentials:true
            })
            dispatch(addUser(res?.data?.data))
            setshowtoast(true)
             setTimeout(()=>{
                setshowtoast(false);
            },3000);
        }
        catch(err){
            seterror(err.response.data);

        }
    }
        return (
            <>
        <div className="flex justify-center gap-4 p-4">
          <div>
   <div className="flex justify-center">
  <div className="card bg-base-200 w-80 shadow-sm">
      <div className="card-body p-4">
      <h2 className="card-title text-lg">Edit Profile</h2>
        <div className="my-2">
    <fieldset className="fieldset my-1">
  <legend className="fieldset-legend text-sm">First Name</legend>
  <input type="text" value={FirstName} className="input input-sm" placeholder="Type here"
  onChange={(e)=>{
    setFirstName(e.target.value)
  }}/>
 
</fieldset>
<fieldset className="fieldset my-1">
  <legend className="fieldset-legend text-sm">Last Name</legend>
  <input type="text" value={LastName} className="input input-sm" placeholder="Type here"
 onChange={(e)=>{
    setLastName(e.target.value)
  }}/>
 
</fieldset>
<fieldset className="fieldset my-1">
  <legend className="fieldset-legend text-sm">Photo URL</legend>
  <input type="text" value={photoUrl} className="input input-sm" placeholder="Type here"
 onChange={(e)=>{
    setphotoUrl(e.target.value)
  }}/>
  </fieldset>
<fieldset className="fieldset my-1">
  <legend className="fieldset-legend text-sm">Age</legend>
  <input type="text" value={age} className="input input-sm" placeholder="Type here"
 onChange={(e)=>{
    setage(e.target.value)
  }}/>
  </fieldset>
  <fieldset className="fieldset my-1">
  <legend className="fieldset-legend text-sm">Gender</legend>
  <input type="text" value={gender} className="input input-sm" placeholder="Type here"
 onChange={(e)=>{
    setgender(e.target.value)
  }}/>
  </fieldset>
  <div className="label font-black">About</div>
  <textarea className="textarea" placeholder="about" value={about}
  onChange={(e)=>{
    setabout(e.target.value)}}> </textarea>
    </div>
   <p className="text-red-500 text-sm">{error} </p>
    <div className="card-actions justify-center my-1">
      <button className="btn btn-primary btn-sm"onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
        </div>
        </div>
        <div className="card bg-gradient-to-br from-base-200 via-base-300 to-base-100 w-96 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300">
          <figure className="h-80 w-full overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse"></div>
            <img
              src={photoUrl || "https://via.placeholder.com/400x400?text=No+Image"}
              alt="Profile preview"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border-2 border-base-300 hover:scale-105 transition-transform duration-300" />
          </figure>
          <div className="card-body bg-gradient-to-br from-base-100 to-base-200">
            <h2 className="card-title text-primary font-bold text-xl">{FirstName + " " + LastName}</h2>
            {age && gender && (<p className="text-secondary font-medium">{age + " " + gender}</p>)}
            <p className="text-base-content/80 leading-relaxed">{about}</p>
          </div>
        </div>
        </div>
  {showtoast  && (    <div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>
)}

        </>
    )

}
export default EditProfile