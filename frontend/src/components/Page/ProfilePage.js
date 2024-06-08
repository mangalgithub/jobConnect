import React, { useState } from 'react';
import axios from 'axios';
function ProfilePage() {
  const [institutions, setInstitutions] = useState([
    { id: 1, name: '', startYear: '', endYear: '' },
  ]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [name,setName]=useState('');
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleAddInstitution = () => {
    setInstitutions([
      ...institutions,
      { id: institutions.length + 1, name: '', startYear: '', endYear: '' },
    ]);
  };

  const handleInstitutionChange = (id, field, value) => {
    const updatedInstitutions = institutions.map((institution) =>
      institution.id === id ? { ...institution, [field]: value } : institution
    );
    setInstitutions(updatedInstitutions);
  };

  const handleNameChange=(e)=>{
    setName(e.target.value);
  }

  const handleAddSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleProfilePhotoUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleUpdateDetails =async() => {
    // Handle updating details logic here
     try{
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/profile_update",
         {
            name: name,
            education: institutions,
            skills: skills,
            resume: resume,
            profilePhoto: profilePhoto,
         },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Handle the response as needed
      // toast.success("Signup successful!");
     }
     catch (error) {
      // toast.error("Invalid credentials. Please try again.");
    }

    console.log('Details updated');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 flex justify-center">
      <div className="container mx-auto px-4 md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>
        
        {/* Name Section */}
        <div className="bg-white p-6 mb-6 rounded-md shadow-md">
          <label className="block mb-2 font-semibold">Name</label>
          <input type="text" value={name} onChange={handleNameChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
        </div>

        {/* Institutions Section */}
        <div className="bg-white p-6 mb-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Institutions</h2>
          {institutions.map((institution) => (
            <div key={institution.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2 font-semibold">Institution Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={institution.name}
                    onChange={(e) => handleInstitutionChange(institution.id, 'name', e.target.value)}
                  />
                </div>
                <div className="w-1/4 pr-2">
                  <label className="block mb-2 font-semibold">Start Year</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={institution.startYear}
                    onChange={(e) => handleInstitutionChange(institution.id, 'startYear', e.target.value)}
                  />
                </div>
                <div className="w-1/4">
                  <label className="block mb-2 font-semibold">End Year</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={institution.endYear}
                    onChange={(e) => handleInstitutionChange(institution.id, 'endYear', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleAddInstitution}
          >
            Add Another Institution
          </button>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 mb-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-2"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleAddSkill}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-4 py-2 rounded-md mr-2 mb-2"
              >
                {skill}
                <button
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Upload Section */}
        <div className="bg-white p-6 mb-6 rounded-md shadow-md">
          <label className="block mb-2 font-semibold">Upload Resume</label>
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleResumeUpload}
          />
        </div>

        {/* Profile Photo Upload Section */}
        <div className="bg-white p-6 mb-6 rounded-md shadow-md">
          <label className="block mb-2 font-semibold">Upload Profile Photo</label>
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleProfilePhotoUpload}
          />
        </div>

        {/* Update Details Button */}
        <div className="text-center">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleUpdateDetails}
          >
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
