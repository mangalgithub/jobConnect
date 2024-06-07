import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { storage } from "./firebase/firebase.js";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function Signup() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("recruiter"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic,setPic]=useState(null)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPic(file);
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const imageRef = ref(storage, `images/${uuidv4()}`);
            await uploadBytes(imageRef, pic);
            const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      const response = await axios.post("http://localhost:5000/user/register", {
        name:name,
        email:email,
        password:password,
       role:role,
        pic:downloadURL
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data); // Handle the response as needed
      toast.success("Signup successful!");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

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
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter confirm password"
                  />
                </div>
                <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="pic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Choose pic
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="pic"
                    name="pic"
                    type="file"
                    autoComplete="pic"
                    required
                    // value={pic}
                    onChange ={handleFileChange}
                    accept="image/*"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter confirm password"
                  />
                </div>
              </div>
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                 Select Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    type="text"
                    autoComplete="role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your role"
                    
                  >
                    <option value="recruiter">Recruiter</option>
                    <option value="jobseeker">JobSeeker</option>
                    </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
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
