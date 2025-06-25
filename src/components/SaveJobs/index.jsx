import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./index.css";

const SaveJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Load saved jobs from localStorage
    const savedJobsData = localStorage.getItem("savedJobs");
    if (savedJobsData) {
      try {
        const parsedJobs = JSON.parse(savedJobsData);
        setSavedJobs(parsedJobs);
      } catch (error) {
        console.error("Error parsing saved jobs:", error);
        setSavedJobs([]);
      }
    }
  }, []);

  const removeSavedJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  return (
    <div>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Saved Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {savedJobs.length > 0 ? (
              savedJobs.map(({ id, logo, company, position, location, role, posted }) => {
                return (
                  <div className="job-list" key={id}>
                    <div className="job-card">
                      <div className="job-name">
                        <img
                          src={
                            logo.startsWith('http') || logo.length > 20
                              ? logo
                              : require(`../../Assets/images/${logo}`)
                          }
                          alt="logo"
                          className="job-profile"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50?text=Logo';
                          }}
                        />
                        <div className="job-detail">
                          <h4>{company}</h4>
                          <h3>{position}</h3>
                          <div className="category">
                            <p>{location}</p>
                            <p>{role}</p>
                            {posted && <p>Posted: {posted}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="job-button">
                        <div className="job-posting">
                          <Link to="/apply-jobs" style={{ textDecoration: 'none', color: 'white' }}>
                            Apply Now
                          </Link>
                        </div>
                        <div className="save-button">
                          <button
                            onClick={() => removeSavedJob(id)}
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              cursor: 'pointer',
                              fontSize: '22px',
                              color: 'red'
                            }}
                            title="Remove from saved jobs"
                          >
                            <AiFillHeart />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                margin: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#666', marginBottom: '10px' }}>No saved jobs yet</h3>
                <p style={{ color: '#999' }}>
                  Jobs you save will appear here. Start browsing and save jobs you're interested in!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveJobs;
