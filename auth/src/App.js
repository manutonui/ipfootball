import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewMatch from "./pages/NewMatch";
import Free from "./pages/Free";
import Paid from "./pages/Paid";
import Stats from "./pages/Stats";
import Nav from "./components/Nav";
import { useAuth } from './hooks/useAuth';


function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <HashRouter>
        <Nav />
          <Routes>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path="/new" element={user ? <NewMatch/> : <Navigate to="/login"/>} />
            <Route path="/free" element={user ? <Free/> : <Navigate to="/login"/> } />
            <Route path="/paid" element={user ? <Paid/> : <Navigate to="/login"/> } />
            <Route path="/stats" element={user ? <Stats/> : <Navigate to="/login"/> } />
            <Route exact path="/" element={user ? <Dashboard/> : <Navigate to="/login"/> } />
          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
