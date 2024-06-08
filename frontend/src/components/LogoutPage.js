const { useEffect } = require("react");
const { useNavigate } = require("react-router-dom");
const axios = require("axios");

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      // Clear token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userType");

      // Remove Authorization header from axios defaults
     // delete axios.defaults.headers.common["Authorization"];

      // Navigate to login page
      navigate("/login");
      console.log("Logout")
    };

    logout();
  }, []);

  return <div>Logging out...</div>;
}

