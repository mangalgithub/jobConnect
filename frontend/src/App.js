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
import ApplicantPage from "./components/Page/ApplicantPage";
import LogoutPage from "./components/LogoutPage";
import JobListings from "./components/Page/BrowseJobPage";
import Notification from "./components/Page/Notification";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/addjobs" element={<AddJobs />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/recruiter_profile" element={<RecruiterProfile />} />
          <Route path="/jobpage" element={<JobSearchPage/>}/>
          <Route path="/applications" element={<AppliedJobsPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/jobpage" element={<JobSearchPage/>}/>
          <Route path="/applicantpage" element={<ApplicantPage/>}/>
          <Route path="/jobpage" element={<JobSearchPage/>}/>
          <Route path="/logout" element={<LogoutPage/>}/>
          <Route path="/jobpage" element={<JobSearchPage/>}/>
          <Route path="/browse" element={<JobListings/>}/>
         <Route path="/notification" element={<Notification/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
