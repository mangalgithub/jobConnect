import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase'; // Adjust the import path as necessary
import toast, { Toaster } from 'react-hot-toast';

function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institutions, setInstitutions] = useState([{ id: 1, name: '', startYear: '', endYear: '' }]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
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

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
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

  const handleUpdateDetails = async () => {
    try {
      const profilePhotoUrl = await uploadFile(profilePhoto, `profile_photos/${profilePhoto.name}`);
      const resumeUrl = await uploadFile(resume, `resumes/${resume.name}`);

      const userProfile = {
        name,
        email,
        resumeUrl,
        profilePhotoUrl,
        institutions,
        skills,
      };

      await axios.post('http://localhost:5000/seeker/profile', userProfile);

      toast.success('Details updated successfully');
    } catch (error) {
      toast.error(`Error updating details: ${error.message}`);
    }
  };

  const uploadFile = async (file, path) => {
    if (!file) return '';
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Section */}
          <div className="bg-white p-6 mb-6 rounded-md shadow-md">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                if (!validateEmail(email)) {
                  toast.error('Invalid email format');
                }
              }}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={institution.name}
                      onChange={(e) => handleInstitutionChange(institution.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-1/4 pr-2">
                    <label className="block mb-2 font-semibold">Start Year</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      value={institution.startYear}
                      onChange={(e) => handleInstitutionChange(institution.id, 'startYear', e.target.value)}
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="block mb-2 font-semibold">End Year</label>
                    <input
                      type="number"
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
            <div className="flex flex-wrap mb-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-200 px-4 py-2 rounded-md mr-2 mb-2">
                  {skill}
                  <button className="ml-2 text-red-500" onClick={() => handleRemoveSkill(skill)}>
                    <i className="fas fa-times"></i>
                  </button>
                  </div>
              ))}
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-2"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Press enter to add a skill"
                onKeyDown={handleAddSkill}
              />
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
    </>
  );
}

export default ProfilePage;
