
import './App.css';
import Home from './pages/home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TwoD from './pages/2d';
import ThreeD from './pages/3d';
import {useSelector} from "react-redux"
import user from './redux/user';
import Login from './components/login';
import RefreeRequests from './pages/refreeRequests';
import AgentProfile from './pages/agentProfile';
import Transaction from './pages/transaction';
import Sale from './pages/sale';
// import DashBoad from './pages/admin/pages/dashboard';

function App() {

  const {user_login} = useSelector(state => state.user)
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/2d" element={<TwoD/>}/>
      <Route path="/3d" element={<ThreeD/>}/>
      <Route path="/refreerequests" element={<RefreeRequests/>}/>
      <Route path="/profile" element={<AgentProfile/>}/>
      <Route path="/transaction" element={<Transaction/>}/>
      <Route path="/sale" element={<Sale/>}/>
      {/* <Route path="/admin" element={<DashBoad/>}/> */}
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
