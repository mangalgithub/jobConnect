import { Link} from "react-router-dom";
import isAuth, { userType } from "../lib/isAuth";
const Navbar = () => {
  return (
    <nav className="navbar flex justify-between items-center shadow-sm px-10 py-4">
      <div className="logo">
        <Link to="/home" className="navbar-brand">
          <h3 className="font-bold">Online Job Portal</h3>
        </Link>
      </div>
      <div className="other">
        {isAuth() ? (
          userType() === "recruiter" ? (
            <ul className="navbar-nav flex space-x-6">
              <li className="nav-item">
                <Link to="/addjobs" className="nav-link">
                  <h5>Add Jobs</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myjobs" className="nav-link">
                  <h5>My Jobs</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/applicantpage" className="nav-link">
                  <h5>Applicants</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/recruiter_profile" className="nav-link">
                  <h5>Profile</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <button className="btn">Logout</button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-6">
              <li className="nav-item">
                <Link to="/browse" className="nav-link">
                  <h5>Browse</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/applications" className="nav-link">
                  <h5>Applications</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/notification" className="nav-link">
                  <h5>Notification</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <h5>Profile</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <button className="btn">Logout</button>
                </Link>
              </li>
            </ul>
          )
        ) : (
          <ul className="flex space-x-6">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <button className="btn">Login</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                <button className="btn">SignUp</button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
