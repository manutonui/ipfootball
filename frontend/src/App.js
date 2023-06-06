import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from './pages/Homepage'
import History from './pages/History'
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscribe from "./pages/Subscribe";
import Paid from "./pages/Paid";
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <div className="overlay" style={{ backgroundImage: "url(/img/roro.jpeg)" }}></div>
      <HashRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/history" element={<History/>}></Route>
            <Route path="/login" element={ !user ? <Login/> : <Navigate to="/" /> }></Route>
            <Route path="/signup" element={ !user ? <Signup/> : <Navigate to="/" />}></Route>
            <Route path="/subscribe" element={ user ? <Subscribe/>: <Navigate to="/login" />}></Route>
            <Route path="/paid" element={ user && user.type === 'paid' ? <Paid/> : <Navigate to="/subscribe" /> }></Route>
          </Routes>
        </div>
      </HashRouter>
      <a href="https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER" className="wa-icon" rel="noreferrer" target="_blank"><img src="/img/WA.png" alt="WA icon"/></a>
    </div>
  );
}

export default App;
