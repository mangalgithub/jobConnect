import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [type, setType] = useState("recruiter");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload a valid image file.");
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "jobportal");
    data.append("cloud_name", "dm3m12wzq");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dm3m12wzq/image/upload",
        data
      );
      setPic(response.data.secure_url);
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Try again.");
      console.error("Cloudinary Upload Error:", error);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        {
          name,
          email,
          password,
          type,
          pic,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Signup successful!");
      console.log(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      console.error("Signup Error:", error);
    }
  }, [name, email, password, confirmPassword, type, pic]);

  return (
    <>
      <Toaster />
      <div className="flex h-screen bg-gradient-to-b from-indigo-800 to-indigo-600">
        <div className="m-auto w-full max-w-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Sign up for an account
            </h2>
          </div>
          <div className="mt-8 bg-white shadow-md rounded-md p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Confirm your password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Choose Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Role
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="recruiter">Recruiter</option>
                  <option value="jobseeker">Job Seeker</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/" className="text-indigo-600 hover:text-indigo-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
