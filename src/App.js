
import './App.css';
import Home from './pages/home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import TwoD from './pages/2d';
import ThreeD from './pages/3d';
// import DashBoad from './pages/admin/pages/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/2d" element={<TwoD/>}/>
      <Route path="/3d" element={<ThreeD/>}/>
      {/* <Route path="/admin" element={<DashBoad/>}/> */}
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
