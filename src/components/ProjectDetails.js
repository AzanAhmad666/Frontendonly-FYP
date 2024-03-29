import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosInformationCircle } from "react-icons/io";
import '../css/createProject.css';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CompanyLayout from './CompanyLayout';


const ProjectDetails = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'freelancer', 'freelancerID']);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        //console.log(cookies.token)
        //console.log(cookies.freelancerID)
        const response = await fetch(`http://localhost:3000/api/v1/project/getProject/${id}`, {
          method: 'POST',
          headers: new Headers({
            'Cookie': `token=${cookies.token}`, // Replace with your auth token
            'Content-Type': 'application/json',
          }),
          redirect: 'follow',
          
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched project details:', result);

        setProjectDetails(result.project); // Set the project details in the state
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]); // Include id in the dependency array to re-fetch details when id changes
  const handleApplyClick = async (e) => {
    e.preventDefault()
    console.log(cookies.token)
    try {
      const response = await fetch(`http://localhost:3000/api/v1/project/applyToProjectasTeam/${id}`, {
        method: 'POST',
        headers: new Headers({
          'Cookie': `token=${cookies.token}`, // Include the token in the request headers
          'Content-Type': 'application/json',
        }),
        redirect: 'follow',
        credentials:'include',
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Application result:', result);

      if (result.success) {
        toast.success('Application successful');
        navigate('/TeamProjects')
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error applying to the project:', error);
      toast.error('An error occurred while applying to the project. Please try again.');
    }
  };
  return (
    <>
      <CompanyLayout >
      <div className="main-content p-5">
        <div>
          <h1 className="createProjecttext mt-5">Project Details</h1>
          <p className="createProjecttext mt-2">Details of the selected project.</p>
          {projectDetails ? (
            <form>
              <div className="form-group">
                <p className="createProjecttext mt-3">
                  <IoIosInformationCircle className="mx-2 mb-1" style={{ fontSize: 'large', color: '#6319B8' }} />
                  Project title:
                </p>
                <input
                  className="inputTitle px-2"
                  value={projectDetails.title}
                  readOnly
                />
              </div>

              <div className="form-group">
                <p className="createProjecttext mt-3">
                  <IoIosInformationCircle className="mx-2 mb-1" style={{ fontSize: 'large', color: '#6319B8' }} />
                  Project type:
                </p>
                <input
                  className="inputTitle px-2"
                  value={projectDetails.type}
                  readOnly
                />
              </div>

              <div className="form-group">
                <p className="createProjecttext mt-3">
                  <IoIosInformationCircle className="mx-2 mb-1" style={{ fontSize: 'large', color: '#6319B8' }} />
                  Technology Stack:
                </p>
                <input
                  className="inputTitle px-2"
                  value={projectDetails.technologystack}
                  readOnly
                />
              </div>

              <div className="form-group">
                <p className="createProjecttext mt-3">
                  <IoIosInformationCircle className="mx-2 mb-1" style={{ fontSize: 'large', color: '#6319B8' }} />
                  Description:
                </p>
                <textarea
                  className="textArea px-2"
                  value={projectDetails.description}
                  readOnly
                />
              </div>

              <div className="form-group">
                <p className="createProjecttext mt-3">
                  <IoIosInformationCircle className="mx-2 mb-1" style={{ fontSize: 'large', color: '#6319B8' }} />
                  Budget (in PKR):
                </p>
                <input
                  className="inputTitle px-2"
                  value={`${projectDetails.budget}`}
                  readOnly
                />
              </div>

              {/* ... (rest of the form) */}

              <div style={{marginLeft:"560px"}}>
              <button className="submitButton mt-5 " style={{borderRadius:"4px"}}
              onClick={handleApplyClick} >
                Apply
              </button>
              </div>
              
              
              
            </form>
          ) : (
            <p>Loading project details...</p>
          )}
        </div>
      </div>
      </CompanyLayout>
    
    </>
  );
};

export default ProjectDetails;
