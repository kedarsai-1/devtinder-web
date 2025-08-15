import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Usercard from "./Usercard"
const Feed = ()=>{
    const feed = useSelector((store)=>store.feed)
    const dispatch = useDispatch();
    const getFeed =async()=>{
        if (feed) return;
        try{
        const res = await axios.get(BASE_URL+"feed",{withCredentials:true})
        dispatch(addfeed(res.data));
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getFeed();
    },[])
    return(
        feed &&(

        <div className="flex justify-center my-10">
            <Usercard user={feed[0]}/>
        </div>
        )
    )
}
export default Feed