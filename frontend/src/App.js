import Signup from "./components/signup";
import Login from "./components/login";
import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomePage from "./components/HomePage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
