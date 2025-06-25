import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "./../../Assets/jobs.json";
import Filter from "../Filter";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([...Job]);
  const [searchterm, setSearchTerm] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    console.log("Jobs component mounted");
    console.log("Initial Job data:", Job);
    const savedJobsData = localStorage.getItem("savedJobs");
    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData));
    }
  }, []);

  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    console.log("Filtering by role:", value);
    setFilteredJobs(
      Job.filter((job) => {
        return job.role === value;
      })
    );
  }

  function saveClick(jobData) {
    console.log("Saving job:", jobData);
    const updatedSavedJobs = [...savedJobs];
    const jobIndex = updatedSavedJobs.findIndex(job => job.id === jobData.id);
    
    if (jobIndex === -1) {
      // Add job to saved jobs
      updatedSavedJobs.push(jobData);
    } else {
      // Remove job from saved jobs
      updatedSavedJobs.splice(jobIndex, 1);
    }
    
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  }

  const searchEvent = (event) => {
    const data = event.target.value;
    setSearchTerm(data);
    console.log("Searching for:", data);
    
    if (data.length > 0) {
      const filterData = Job.filter((item) => {
        if (item) {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(data.toLowerCase());
        }
        return false;
      });
      setFilteredJobs(filterData);
    } else {
      setFilteredJobs([...Job]);
    }
  };

  function handleExperienceFilter(checkedState) {
    console.log("Experience filter state:", checkedState);
    let filters = [];
    let hasActiveFilters = false;
    
    checkedState.forEach((item, index) => {
      if (item === true) {
        hasActiveFilters = true;
        const filterS = Job.filter((job) => {
          if (index === 3) {
            // 5+ years
            return job.experience >= 5;
          } else {
            return (
              job.experience >= experience[index].min &&
              job.experience <= experience[index].max
            );
          }
        });
        filters = [...filters, ...filterS];
      }
    });
    
    if (hasActiveFilters) {
      // Remove duplicates based on job id
      const uniqueFilters = filters.filter((job, index, self) => 
        index === self.findIndex(j => j.id === job.id)
      );
      setFilteredJobs(uniqueFilters);
    } else {
      setFilteredJobs([...Job]);
    }
  }

  const isJobSaved = (jobId) => {
    return savedJobs.some(job => job.id === jobId);
  };

  console.log("Current filtered jobs:", filteredJobs.length);

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Our Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(
                ({ id, logo, company, position, location, posted, role }) => {
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
                            </div>
                          </div>
                        </div>
                        <div className="job-button">
                          <div className="job-posting">
                            <Link to="/apply-jobs">Apply Now</Link>
                          </div>
                          <div className="save-button">
                            <button
                              onClick={() => {
                                saveClick({
                                  id,
                                  logo,
                                  company,
                                  position,
                                  location,
                                  posted,
                                });
                              }}
                              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                              {isJobSaved(id) ? (
                                <AiFillHeart style={{ color: 'red' }} />
                              ) : (
                                <AiOutlineHeart />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>

          <Filter
            setFilteredJobs={setFilteredJobs}
            handleJobFilter={handleJobFilter}
            handleExperienceFilter={handleExperienceFilter}
            searchEvent={searchEvent}
          />
        </div>
      </div>
    </>
  );
};

export default Jobs;
