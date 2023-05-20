import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewMatch from "./pages/NewMatch";
import All from "./pages/All";
import Stats from "./pages/Stats";
import Nav from "./components/Nav";
import { useAuth } from './hooks/useAuth';


function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
          <Routes>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path="/new" element={user ? <NewMatch/> : <Navigate to="/login"/>} />
            <Route path="/all" element={user ? <All/> : <Navigate to="/login"/> } />
            <Route path="/stats" element={user ? <Stats/> : <Navigate to="/login"/> } />
            <Route exact path="/" element={user ? <Dashboard/> : <Navigate to="/login"/> } />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
