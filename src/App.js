
import './App.css';
import { useState,useEffect } from 'react';
import Home from './pages/home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TwoD from './pages/2d';
import ThreeD from './pages/3d';
import {useSelector,useDispatch} from "react-redux"
import user, { login } from './redux/user';
import Login from './components/login';
import RefreeRequests from './pages/refreeRequests';
import AgentProfile from './pages/agentProfile';
// import Transaction from './pages/transaction';
import Sale from './pages/sale';
import { isMorningOrEvening, countdown, resetRound, changeRound, threeDCountDown } from './redux/countdown';
import OpProfile from './pages/opProfile';
import ViewRefree from './pages/viewrefree';
import Transaction from './pages/transaction';
import Notifications from './pages/notifications';
// import DashBoad from './pages/admin/pages/dashboard';
import {axiosInstance} from "./urlConfig"
import {logout} from "./redux/user"

import {useNavigate} from "react-router-dom"
import Pusher from 'pusher-js';

function App(){
  return (
    <BrowserRouter>
        <ParentRouter/>
    </BrowserRouter>
  )
}

function ParentRouter() {

  const [error,setError] = useState(null)

  const navigate = useNavigate()

  // const {user_login} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const checkJwt = () => {
    const local = localStorage.getItem("auth")
    if(local){
      const auth = JSON.parse(local)
      const user = {
        id: auth.id,
        name : auth.name,
        phNo : auth.phNo,
        role: auth.role,
        token:auth.token,
        isLoggedIn:auth.isLoggedIn,
    }

    dispatch(login(user))
    }
  }

  // useEffect(() => {},[])

  

  useEffect(() => {
    axiosInstance.interceptors.response.use(function(response){
      // checkJwt()
      if(response.data.status === 401){
        navigate("/")
        localStorage.removeItem("auth")
        dispatch(logout())
        alert("Unauthorized")
      }
      return response
    }, function(error) {
      // const dispatch = useDispatch()
      if(error.response ){
        navigate("/")
        localStorage.removeItem("auth")
        dispatch(logout())
        alert("Something went wrong. Please log in again.")
      // console.log(error)
      return
      }

      return Promise.reject(error);
    })
  },[])


  // useEffect(() => {
  //   let pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  //     cluster: process.env.REACT_APP_PUSHER_CLUSTER
  //   });
  // },[])

  useEffect(() => {
    checkJwt()

    threeDCountDown()

    
    const intervalId = setInterval(()=>{

      //check whether it is morning round or evening round
      const test = isMorningOrEvening()
      
      if(test.isMorningRound){
        // console.log("morning")
        dispatch(changeRound("morning"))
        var now = new Date();
        var endTime1 = '12:30:00';

        //get the end time
        var e1 =  endTime1.split(':');
        var dt2 = new Date(now.getFullYear(), now.getMonth(),
                        now.getDate(),parseInt(e1[0]), parseInt(e1[1]), parseInt(e1[2]));

        // Find the distance between now and the count down date
        var distance = dt2 - now;

        // Time calculations for days, hours, minutes and seconds
        // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // console.log(hours,minutes,seconds)
        dispatch(countdown({hours,minutes,seconds}))
      }

      else if(test.isEveningRound){
        // console.log("evening")
        dispatch(changeRound("evening"))
        var now = new Date();
        var endTime2 = "24:00:00"
        
        //get the end time
        var e2 =  endTime2.split(':');
        var dt4 = new Date(now.getFullYear(), now.getMonth(),
                        now.getDate(),parseInt(e2[0]), parseInt(e2[1]), parseInt(e2[2]));

        // Find the distance between now and the count down date
        var distance = dt4 - now;

        // Time calculations for days, hours, minutes and seconds
        // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // console.log(hours,minutes,seconds)
        dispatch(countdown({hours,minutes,seconds}))
      }else{
        dispatch(resetRound())
      }
    },1000)

    return () => clearInterval(intervalId)


  },[])



  return (
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/2d" element={<TwoD/>}/>
      <Route path="/3d" element={<ThreeD/>}/>
      <Route path="/refreerequests" element={<RefreeRequests/>}/>
      <Route path="/agentprofile" element={<AgentProfile/>}/>
      {/* <Route path="/transaction" element={<Transaction/>}/> */}
      <Route path="/sale" element={<Sale/>}/>
      {/* <Route path="/admin" element={<DashBoad/>}/> */}
      <Route path="/opprofile" element={<OpProfile/>}/>
      <Route path = "/viewreferee" element={<ViewRefree/>}/>
      <Route path="/transaction" element={<Transaction/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
    </Routes>
    
    
  );
}

export default App;
