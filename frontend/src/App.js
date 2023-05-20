import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from './pages/Homepage'
import History from './pages/History'
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <div className="overlay" style={{ backgroundImage: "url(/img/roro.jpeg)" }}></div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/history" element={<History/>}></Route>
            <Route path="/login" element={ !user ? <Login/> : <Navigate to="/" /> }></Route>
            <Route path="/signup" element={ !user ? <Signup/> : <Navigate to="/" />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;