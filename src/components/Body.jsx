import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
const Body = ()=>{
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  
  const fetchUser =async()=>{
    if (userData) return ;
    try{
    const res = await axios.get(BASE_URL+"/profile/view",{
      withCredentials:true
    }
  )
  dispatch(addUser(res.data))

  }

catch(err){
  const status = err?.response?.status;
  if (status === 401) {
    navigate('/login', { replace: true });
    return;
  }
  console.log(err);
}
  }
  
useEffect(()=>{
 
fetchUser()
  
},[]);
    return(
        <>
          <NavBar/>
          <Outlet/>
          <Footer/>
        </>
    )
}
export default Body