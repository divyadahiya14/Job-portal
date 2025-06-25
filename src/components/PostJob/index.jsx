import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [formData, setFormData] = useState({
    company: "",
    logo: "",
    position: "",
    salary: "",
    experience: "",
    role: "",
    location: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      getBase64(file).then((base64) => {
        setFormData(prev => ({
          ...prev,
          logo: base64
        }));
      });
    }
  };

  const validateForm = () => {
    if (!formData.company.trim()) {
      alert("Please enter company name");
      return false;
    }
    if (!formData.position) {
      alert("Please select a position");
      return false;
    }
    if (!formData.experience) {
      alert("Please select experience level");
      return false;
    }
    if (!formData.salary) {
      alert("Please select salary range");
      return false;
    }
    if (!formData.role.trim()) {
      alert("Please enter job role");
      return false;
    }
    if (!formData.location.trim()) {
      alert("Please enter job location");
      return false;
    }
    return true;
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const jobPost = {
      id: Date.now(), // Generate unique ID
      company: formData.company,
      position: formData.position,
      salary: formData.salary,
      experience: formData.experience,
      role: formData.role,
      location: formData.location,
      logo: formData.logo,
      posted: new Date().toISOString().split('T')[0] // Current date
    };

    try {
      let savedItem = [];
      if (localStorage.getItem("item")) {
        savedItem = JSON.parse(localStorage.getItem("item"));
      }
      localStorage.setItem("item", JSON.stringify([...savedItem, { jobPost }]));
      
      // Simulate API call
      setTimeout(() => {
        alert("Job Posted Successfully!");
        setIsSubmitting(false);
        navigate("/Jobs");
      }, 1000);
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Error posting job. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="job-background">
        <div className="title">
          <h2>Post a Job</h2>
        </div>
      </div>
      <div className="container">
        <header className="header">
          <h1 className="post-job">Post Your Job Opening</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Fill out the form below to post a new job opportunity
          </p>
        </header>
        <form onSubmit={handleSubmitButton}>
          <div className="form-group">
            <label htmlFor="company">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="form-control"
              placeholder="Enter Company Name"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Job Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              placeholder="Enter Job Location (e.g., Remote, Mumbai, Bangalore)"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="logo">
              Company Logo
            </label>
            <input
              type="file"
              id="myFile"
              name="logo"
              accept="image/*"
              onChange={handleImg}
              style={{ display: 'none' }}
            />
            <label htmlFor="myFile" style={{ cursor: 'pointer' }}>
              {selectedFile ? `✓ ${selectedFile.name}` : 'Choose Company Logo'}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="position">
              Position Type *
            </label>
            <select
              id="position"
              name="position"
              className="form-control"
              value={formData.position}
              onChange={handleInputChange}
              required
            >
              <option value="">Select position</option>
              <option value="Frontend">Frontend Developer</option>
              <option value="Backend">Backend Developer</option>
              <option value="Full Stack">Full Stack Developer</option>
              <option value="Devops">DevOps Engineer</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="role">
              Job Role/Title *
            </label>
            <input
              type="text"
              id="role"
              name="role"
              className="form-control"
              placeholder="Enter Job Role (e.g., Senior React Developer)"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Experience Level *</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  name="experience"
                  value="0-1 Year"
                  type="radio"
                  className="input-radio"
                  checked={formData.experience === "0-1 Year"}
                  onChange={handleInputChange}
                />
                <span style={{ marginLeft: '8px' }}>0-1 Year</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  name="experience"
                  value="2-3 Years"
                  type="radio"
                  className="input-radio"
                  checked={formData.experience === "2-3 Years"}
                  onChange={handleInputChange}
                />
                <span style={{ marginLeft: '8px' }}>2-3 Years</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  name="experience"
                  value="4-5 Years"
                  type="radio"
                  className="input-radio"
                  checked={formData.experience === "4-5 Years"}
                  onChange={handleInputChange}
                />
                <span style={{ marginLeft: '8px' }}>4-5 Years</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  name="experience"
                  value="5+ Years"
                  type="radio"
                  className="input-radio"
                  checked={formData.experience === "5+ Years"}
                  onChange={handleInputChange}
                />
                <span style={{ marginLeft: '8px' }}>5+ Years</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="salary">
              Salary Range *
            </label>
            <select
              id="salary"
              name="salary"
              className="form-control"
              value={formData.salary}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Salary Range</option>
              <option value="0-15K">₹0-15K</option>
              <option value="15-30K">₹15-30K</option>
              <option value="30K-50K">₹30K-50K</option>
              <option value="50K-80K">₹50K-80K</option>
              <option value="80K+">₹80K+</option>
            </select>
          </div>

          <div className="form-group">
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting Job...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
