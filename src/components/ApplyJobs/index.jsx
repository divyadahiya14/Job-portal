import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const ApplyJobs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    coverLetter: ''
  });
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please upload a PDF file for your resume');
      e.target.value = '';
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    if (!resume) {
      alert('Please upload your resume');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Your job application has been submitted successfully!');
      setIsSubmitting(false);
      navigate('/jobs');
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="apply-job">
        <div className="container">
          <header className="header">
            <h1 className="post-job">Job Application Form</h1>
            <p className="description">
              Please fill out the form below to apply for the position
            </p>
          </header>
          
          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="name">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                className="form-control"
                placeholder="Enter your full name"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="form-control"
                placeholder="Enter your email address"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                className="form-control"
                placeholder="Enter your phone number"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                Years of Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                className="form-control"
                onChange={handleInputChange}
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="2-3">2-3 years</option>
                <option value="4-5">4-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="skills">
                Skills & Technologies
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                className="form-control input-textarea"
                placeholder="List your key skills and technologies (e.g., React, Node.js, Python, etc.)"
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                className="form-control input-textarea"
                placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                onChange={handleInputChange}
                rows="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">
                Upload Resume (PDF only) *
              </label>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-input"
                  required
                />
                <label htmlFor="resume" className="file-label">
                  {resume ? resume.name : 'Choose PDF file'}
                </label>
              </div>
              {resume && (
                <p className="file-info">✓ {resume.name} selected</p>
              )}
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyJobs;
