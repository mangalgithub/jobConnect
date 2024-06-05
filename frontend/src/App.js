import Signup from "./components/signup";
import Login from "./components/login";
import AddJobs from "./components/recruiter/addjobs";
import MyJobs from "./components/recruiter/myjobs";
import RecruiterProfile from "./components/recruiter/Profile";
import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomePage from "./components/Page/HomePage";
import JobSearchPage from "./components/Page/JobSearchPage";
import Navbar from "./components/Navbar";
import AppliedJobsPage from "./components/Page/AppliedJobPage";
import ProfilePage from "./components/Page/ProfilePage";
function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/addjobs" element={<AddJobs />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/recruiter_profile" element={<RecruiterProfile />} />
          <Route path="/jobpage" element={<JobSearchPage/>}/>
          <Route path="/applications" element={<AppliedJobsPage/>}/>
          <Route path="/profile-page" element={<ProfilePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
