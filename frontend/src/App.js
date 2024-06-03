import Signup from "./components/signup";
import Login from "./components/login";
import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
