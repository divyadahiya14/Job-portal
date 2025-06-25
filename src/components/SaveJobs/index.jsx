import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "../../Assets/jobs.json";

const SaveJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentJobData, setCurrentJobData] = useState([]);

  useEffect(() => {
    // Load current job data
    setCurrentJobData([...Job]);
    
    // Load saved jobs from localStorage
    const savedJobsData = localStorage.getItem("savedJobs");
    if (savedJobsData) {
      try {
        const parsedJobs = JSON.parse(savedJobsData);
        
        // Filter out saved jobs that no longer exist in current job data
        const validSavedJobs = parsedJobs.filter(savedJob => 
          Job.some(currentJob => currentJob.id === savedJob.id)
        );
        
        // If some saved jobs were invalid, update localStorage
        if (validSavedJobs.length !== parsedJobs.length) {
          localStorage.setItem("savedJobs", JSON.stringify(validSavedJobs));
          console.log("Removed invalid saved jobs");
        }
        
        setSavedJobs(validSavedJobs);
      } catch (error) {
        console.error("Error parsing saved jobs:", error);
        setSavedJobs([]);
      }
    }
  }, []);

  const removeSavedJob = (jobId) => {
    console.log("Removing job with ID:", jobId);
    const updatedSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    console.log("Updated saved jobs:", updatedSavedJobs);
  };

  const clearAllSavedJobs = () => {
    setSavedJobs([]);
    localStorage.removeItem("savedJobs");
    console.log("Cleared all saved jobs");
  };

  const refreshSavedJobs = () => {
    // Reload current job data
    setCurrentJobData([...Job]);
    
    // Reload saved jobs from localStorage
    const savedJobsData = localStorage.getItem("savedJobs");
    if (savedJobsData) {
      try {
        const parsedJobs = JSON.parse(savedJobsData);
        
        // Filter out saved jobs that no longer exist in current job data
        const validSavedJobs = parsedJobs.filter(savedJob => 
          Job.some(currentJob => currentJob.id === savedJob.id)
        );
        
        // Update localStorage with valid jobs
        localStorage.setItem("savedJobs", JSON.stringify(validSavedJobs));
        setSavedJobs(validSavedJobs);
        
        console.log("Refreshed saved jobs:", validSavedJobs);
      } catch (error) {
        console.error("Error refreshing saved jobs:", error);
        setSavedJobs([]);
      }
    }
  };

  // Get the most up-to-date job data for saved jobs
  const getUpdatedJobData = (savedJob) => {
    const currentJob = currentJobData.find(job => job.id === savedJob.id);
    return currentJob || savedJob;
  };

  console.log("Current saved jobs:", savedJobs);
  console.log("Current job data length:", currentJobData.length);

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
              <>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '20px',
                  padding: '15px 20px',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <span style={{ fontWeight: '600', color: '#2d3748' }}>
                    {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={refreshSavedJobs}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Refresh
                    </button>
                    <button
                      onClick={clearAllSavedJobs}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                {savedJobs.map((savedJob) => {
                  // Get the most up-to-date job data
                  const job = getUpdatedJobData(savedJob);
                  const { id, logo, company, position, location, role, posted } = job;
                  
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
                })}
              </>
            ) : (
              <div className="no-saved-jobs">
                <h3>No saved jobs yet</h3>
                <p>
                  Jobs you save will appear here. Start browsing and save jobs you're interested in!
                </p>
                <button
                  onClick={refreshSavedJobs}
                  style={{
                    marginTop: '20px',
                    padding: '12px 24px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  Refresh Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveJobs;
