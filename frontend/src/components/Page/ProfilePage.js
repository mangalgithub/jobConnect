import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institutions, setInstitutions] = useState([{ id: 1, name: '', startYear: '', endYear: '' }]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [resume, setResume] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleAddInstitution = () => {
    setInstitutions([
      ...institutions,
      { id: institutions.length + 1, name: '', startYear: '', endYear: '' },
    ]);
  };

  const handleInstitutionChange = (id, field, value) => {
    setInstitutions(
      institutions.map((institution) =>
        institution.id === id ? { ...institution, [field]: value } : institution
      )
    );
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'jobportal'); // Make sure this is correct
    data.append('cloud_name', 'dm3m12wzq'); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dm3m12wzq/upload',
        data
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error('File upload failed');
      console.error('Cloudinary Upload Error:', error);
      return null;
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setResume(url);
        toast.success('Resume uploaded successfully!');
      }
    }
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setProfilePhoto(url);
        toast.success('Profile photo uploaded successfully!');
      }
    }
  };

  const handleUpdateDetails = async () => {
    try {
      const token = localStorage.getItem('token');

      const userProfile = {
        name,
        email,
        institutions,
        skills,
        resume,
        profilePhoto,
      };

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seeker/profile`,
        userProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Details updated successfully');
    } catch (error) {
      toast.error(`Error updating details: ${error.message}`);
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-gray-100 min-h-screen py-8 flex justify-center">
        <div className="container mx-auto px-4 md:w-2/3 lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>

          {/* Name Section */}
          <div className="bg-white p-6 mb-6 rounded-md shadow-md">
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Section */}
          <div className="bg-white p-6 mb-6 rounded-md shadow-md">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      value={institution.name}
                      onChange={(e) => handleInstitutionChange(institution.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-1/4 pr-2">
                    <label className="block mb-2 font-semibold">Start Year</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      value={institution.startYear}
                      onChange={(e) => handleInstitutionChange(institution.id, 'startYear', e.target.value)}
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="block mb-2 font-semibold">End Year</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      value={institution.endYear}
                      onChange={(e) => handleInstitutionChange(institution.id, 'endYear', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleAddInstitution}
            >
              Add Another Institution
            </button>
          </div>

          {/* Resume Upload */}
          <div className="bg-white p-6 mb-6 rounded-md shadow-md">
            <label className="block mb-2 font-semibold">Upload Resume</label>
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleResumeUpload}
            />
          </div>

          {/* Profile Photo Upload */}
          <div className="bg-white p-6 mb-6 rounded-md shadow-md">
            <label className="block mb-2 font-semibold">Upload Profile Photo</label>
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleProfilePhotoUpload}
            />
          </div>

          {/* Update Details Button */}
          <div className="text-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleUpdateDetails}
            >
              Update Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
