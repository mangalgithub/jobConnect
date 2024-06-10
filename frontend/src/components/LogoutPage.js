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
      navigate("/");
      console.log("Logout")
      window.location.reload();
    };

    logout();
  }, []);

  return <div>Logging out...</div>;
}

