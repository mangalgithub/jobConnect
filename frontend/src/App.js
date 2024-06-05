import Signup from "./components/signup";
import Login from "./components/login";
import AddJobs from "./components/recruiter/addjobs";
import MyJobs from "./components/recruiter/myjobs";
import RecruiterProfile from "./components/recruiter/Profile";
import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import JobSearchPage from "./components/JobSearchPage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/addjobs" element={<AddJobs />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/recruiter_profile" element={<RecruiterProfile />} />
          <Route path="/jobpage" element={<JobSearchPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
