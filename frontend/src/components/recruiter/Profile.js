import { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/material.css";
import toast, { Toaster } from "react-hot-toast";

const Profile = (props) => {
//   const setPopup = useContext(SetPopupContext);
  const [loading, setLoading] = useState(false); // Set to false for dummy data
  const [profileDetails, setProfileDetails] = useState({
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    contactNumber: "+1234567890",
  });

  const [phone, setPhone] = useState("+1234567890");

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  const handleUpdate=async()=>{
    try{
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/profile_update`,
        {
          name: profileDetails.name,
          email: profileDetails.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      toast.success("Profile updated successfully!");

    }
    catch(error){
      // console.error("Error updating profile:",error);
      toast.error("Error updating profile. Please try again.");
  }
  }

  return (
    <>  
    <Toaster />
        <div className="flex flex-col items-center p-4">
          <h1 className="border-b font-bold text-xl mt-4">Profile</h1>
          <div className="w-3/4 mt-4 bg-white border rounded-lg shadow-lg p-4">
            <div className="space-y-4">
              <input
                type="text"
                value={profileDetails.name}
                onChange={(event) => handleInput("name", event.target.value)}
                placeholder="Name"
                className="input-box w-full"
              />
              <textarea
                value={profileDetails.bio}
                onChange={(event) => {
                  const bioValue = event.target.value;
                  if (
                    bioValue.split(" ").filter((n) => n !== "").length <= 250
                  ) {
                    handleInput("bio", bioValue);
                  }
                }}
                placeholder="Bio (upto 250 words)"
                className="w-full resize-none border rounded-lg p-2"
                rows={8}
              />
              <div className="flex justify-center">
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  containerClass="w-auto"
                />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleUpdate()}
              >
                Update Details
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default Profile;
