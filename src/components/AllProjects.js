import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../css/allProject.css';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects and update state
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/project/getProjects", {
          method: 'GET',
          headers: new Headers({
            'Cookie': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNzMyZDYzNjUzNGUzNzgyNTBjMjUiLCJpYXQiOjE3MDIwNjQ5NjZ9.In6HZLkcWb75kuVErmvwQ41XiUXiPuMKaqnsFI14ymI',
            'Content-Type': 'application/json',
          }),
          redirect: 'follow',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('Fetched projects:', result); // Log the fetched projects
  
        setProjects(result.projects || []); // Use result.projects if it exists, otherwise use an empty array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);  // Empty dependency array means this effect will run once when the component mounts

  return (
    <>
      <div className="flexContainer">
        <Sidebar />
        <div className="main-content">
         
              <h1 className="createProjecttext mt-5 mb-5">All Projects</h1>
              {loading ? (
                <p>Loading projects...</p>
              ) : (
                <div className="row">
                  {projects.map((project) => (
                    <div key={project._id} className="col-md-6 mb-4">
                      <div className="card card-background" style={{ height: '275px' }}>
                        <div className="card-header cardHeader">
                          <span className="projectText ">Project Type:</span> <span style={{color:'#424446'}}>{project.type}</span>
                        </div>
                        <div className="card-body d-flex flex-column" >
                          <h5 className="card-title mb-4">
                            <span className="projectText fw-bold">Project Title: </span><span style={{color:'#6C7172'}}>{project.title}</span>
                          </h5>
                          <p className="card-text mb-4">
                            <span className="projectText">Technology Stack: </span><span style={{color:'#6C7172'}}>{project.technologystack}</span>
                          </p>
                          <p className="card-text mb-4">
                            <span className="projectText">Required Members: </span><span style={{color:'#6C7172'}}>{project.requiredMembers.join(' , ')}</span>
                          </p>
                          <a href="#" className="mt-auto btn detailButton">
                            Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            
        </div>
      </div>
    </>
  );
};

export default AllProjects;
