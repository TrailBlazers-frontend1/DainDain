
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
import { pusher } from './pusher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {setAgentProfile} from "./redux/agent"
import {setRefereeProfile} from "./redux/refereeProfile"

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
  const notify = (message) => toast(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    });

  const dispatch = useDispatch()

  const {user_login} = useSelector(state => state.user)
  const {profile} = useSelector(state => state.agent)

  // const channel = pusher.subscribe(`accepted-channel.${profile.refereeId}`);
   

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

  const fetchAgentProfile = async () => {
    try {
        const res = await axiosInstance.get("/agent-profile",{headers:{Authorization:`Bearer ${user_login.token}`}})

            // console.log(res)
            if(res.data.status === 200){
                const agent = {
                    id:res.data.agent.id,
                    image:res.data.agent.image,
                    coin_amount:res.data.agent.cashincashout.coin_amount,
                    commission:res.data.agent.commision,
                    refereeId: res.data.agent.referee_id,
                    twod_sale_list:res.data.twod_lists,
                    threed_sale_list:res.data.threed_lists,
                    lonepyine_sale_list:res.data.lonepyaing_lists,
                }

                dispatch(setAgentProfile(agent))

                // console.log(profile)
            }
    } catch (error) {
        notify(error.message)
    }
    
}


  //  useEffect(() => {
  //       if(user_login.isLoggedIn && user_login.role === "agent"){ 
  //           const channel1 = pusher.subscribe(`accepted-channel.${profile.refereeId}`);
  //           channel1.bind('App\\Events\\AcceptedSMS', function(data) { 
  //             notify(data)
  //             fetchAgentProfile()
              
  //           });
    
  //           const channel2 = pusher.subscribe(`channel-agent.${profile.id}`)
  //           channel2.bind("App\\Events\\agent_cash", function(data) {
  //               notify(data)
  //               fetchAgentProfile()
  //           })
  //           return (() => {
  //                   pusher.unsubscribe(`accepted-channel.${profile.refereeId}`)
  //                   pusher.unsubscribe(`channel-agent.${profile.id}`)
  //               })
  //       }
        
  //           // eslint-disable-next-line react-hooks/exhaustive-deps
  //   },[])



  

  useEffect(() => {
    axiosInstance.interceptors.response.use(function(response){
      // checkJwt()
      if(response.status === 401){
        navigate("/")
        localStorage.removeItem("auth")
        dispatch(logout())
        notify("Unauthorized")
      }
      return response
    }, function(error) {
      // const dispatch = useDispatch()
      if(error.response ){
        navigate("/")
        localStorage.removeItem("auth")
        dispatch(logout())
        // notify("Something went wrong. Please log in again.") 
      // console.log(error)
      // return
      }

      return Promise.reject(error);
    })
  },[])

  


  useEffect(() => {
    checkJwt()

    threeDCountDown()

    // fetchAgentProfile()
    // fetchRefereeProfile()
    


    
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
    <>
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
      {/* <Route path="/notifications" element={<Notifications/>}/> */}
    </Routes>
    <ToastContainer toastClassName="mobile-toaster" />
    </>
    
    
  );
}

export default App;
