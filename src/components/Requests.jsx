import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect,useState } from "react";
import axios from 'axios'

const Requests =()=>{
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests)
    const [Err,seterr]=useState("");
    const reviewrequest =async(status,_id)=>{
        try{
          const res=  await axios.post(BASE_URL+"request/review/"+status+"/"+ _id,{},{withCredentials:true});
          dispatch(removeRequest(_id));
        }
        catch(err){
            seterr(err);
            console.log(Err);

        }
    }
    const fetchRequests = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"user/requests/received",{
                withCredentials:true,
            })
       
            dispatch(addRequests(res.data?.connectionRequests));

        }
     

        catch(err){ 
            seterr(err);
            console.log(Err);

        }
    }
    useEffect(()=>{
        fetchRequests();
    },[])

    if(!requests){
        return;
    }
    if(requests.length ===0){
        return <h1 className="flex justify-center my-10">No Requests Found</h1>
    }
    return(
        <div className="  text-center justify-center my-10">
          <h1 className="font-bold text-2xl">Requests</h1>  
          {requests.map(request=>
          {
            const {_id,FirstName,LastName,photoUrl,age,gender,about}=request.fromUserId;
            return(
          <div
          key={_id} 
          className=" flex justify-between items-center m-4 p-4  bg-base-300 w-2/3 mx-auto rounded-lg">
            <div> <img alt="photo" className="w-20 h-20 rounded-full " src = {photoUrl}/></div>
            <div className="text-left mx-4">
          
           <h2 className="font-bold text-xl">{FirstName +" " +LastName} </h2>
           {age && gender && (<p>{age +" "+ gender}</p>)}
        
           <p>{about}</p>
           </div>
           <div>
           <button className="btn btn-primary mx-2"onClick={()=>reviewrequest("accepted",request._id)}>Accept</button>
            <button className="btn btn-secondary mx-2"onClick={()=>reviewrequest("rejected",request._id)}>Reject</button>

            </div>

          </div>
          )}
        )}
        </div>
    )
}
export default Requests