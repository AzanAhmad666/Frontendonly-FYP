import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosInformationCircle } from "react-icons/io";
import "../../css/createProject.css";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CompanyLayout from "../CompanyLayout";
import ShowProfile from "../ShowProfile";
import ApplicantDetails from "./ApplicantDetails";
import { Link } from 'react-router-dom';



const FreelancerApplicants = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [applicants, setapplicants] = useState(null);
  const [applicantsCount, setapplicantsCount] = useState(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "freelancer", "freelancerID"]);


  //If as solo apply on project then call api of assign project as solo
  const containsAllSoloProject = window.location.pathname.includes('allSoloProject');
  

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        //console.log(cookies.token)
        //console.log(cookies.freelancerID)
        //console.log(id)
        const response = await fetch(
          `http://localhost:3000/api/v1/Project/${id}/applicants`,
          {
            method: "GET",
            headers: new Headers({
              Cookie: `token=${cookies.token}`, // Replace with your auth token
              "Content-Type": "application/json",
            }),
            redirect: "follow",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched project details:", result);

        setProjectDetails(result.project); // Set the project details in the state
        setapplicants(result.applicants);
        setapplicantsCount(result.count);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]); // Include id in the dependency array to re-fetch details when id changes
  const handleAssignApplicantClick = async (applicantId) => {
    console.log(applicantId)
    // e.preventDefault();
    try {

      const apiURL = `http://localhost:3000/api/v1/Company/select/${id}`
      console.log(apiURL)
      const response = await fetch(apiURL,
        {
          method: "PATCH",
          headers: new Headers({
            Cookie: `token=${cookies.token}`, // Include the token in the request headers
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ selectedId: applicantId }),
          redirect: "follow",
          credentials: "include",
        }
      );
      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Application result:", result);

      if (result.success) {
        toast.success("Project Assigned successfully");
        navigate("/allSoloProject");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error applying to the project:", error);
      toast.error(
        "An error occurred while applying to the project. Please try again."
      );
    }
  
  };
  return (
    <>
      <CompanyLayout>
        <div className="main-content p-5">
          <div>
            <h1 className="createProjecttext mt-5">Project Details</h1>
            <p className="createProjecttext mt-2">
              Details of the selected project.
            </p>
            {projectDetails ? (
              <>
                <form>
                  <div className="container bg-secondary bg-opacity-25 rounded py-5 px-5">
                    <div className="row d-flex align-items-center  justify-content-lg-start justify-content-center">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group mx-auto ">
                          <p className=" ">
                            <IoIosInformationCircle
                              className="mx-2 mb-1"
                              style={{ fontSize: "large", color: "#6319B8" }}
                            />
                            Project title:
                          </p>
                          <div className="inputTitle  py-3   pr-5">
                            <input
                              className="px-2 bg-transparent border-0 w-100"
                              value={projectDetails.title}
                              readOnly
                            />
                          </div>
                       
                        </div>
                      </div>

                      <d iv className="col-lg-6 col-md-12 col-sm-12 ">
                        <div className="form-group mx-auto">
                          <p className="createProjecttext ">
                            <IoIosInformationCircle
                              className="mx-2 mb-1"
                              style={{ fontSize: "large", color: "#6319B8" }}
                            />
                            Project type:
                          </p>
                          <div className="inputTitle  py-3   pr-5">
                          <input
                              className="px-2 bg-transparent border-0 w-100"
                            value={projectDetails.type}
                            readOnly
                          />
                       </div>

                        </div>
                      </d>

                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <p className="createProjecttext mt-3">
                            <IoIosInformationCircle
                              className="mx-2 mb-1"
                              style={{ fontSize: "large", color: "#6319B8" }}
                            />
                            Required Members:
                          </p>


                          
                          <ul className="inputTitle overflow-auto  flex align-items-center py-4 commonFields">
                            {projectDetails.requiredMembers.map(
                              (member, index) => (
                               <>
                                <li className="w-100" key={index}>{member}</li>
                              </>
                              )
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <p className="createProjecttext mt-3">
                            <IoIosInformationCircle
                              className="mx-2 mb-1"
                              style={{ fontSize: "large", color: "#6319B8" }}
                            />
                            Description:
                          </p>
                          <div className="inputTitle commonFields  ">
                          <textarea
                             className="px-2 w-100 commonFields py-2  bg-transparent border-0  "
                             style={{minWidth:"95%"}}
                            value={projectDetails.description}
                            readOnly
                          />
                        </div> </div>
                      </div>

                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <p className="createProjecttext mt-3">
                            <IoIosInformationCircle
                              className="mx-2 mb-1"
                              style={{ fontSize: "large", color: "#6319B8" }}
                            />
                            Budget (in PKR):
                          </p>
                          <div className="inputTitle  py-3   pr-5">
                          <input
                              className="px-2 bg-transparent border-0"
                            value={`${projectDetails.budget}`}
                            readOnly
                          />
                        </div> </div>
                      </div>
                    </div>
                  </div>
                  
                  

                </form>
                <h2 className="mt-5">Applicants Details</h2>   
                <h4 className="mt-3">Total Applicants: {applicantsCount}</h4>         
                {/* Solo applicant list */}
                {containsAllSoloProject && (
                    <div className=" solo-applicant-card">
                        {applicants.map((applicant, index) => (
                            
                            <div key={index} className='d-flex justify-center my-5'>
                            <div className="card-container ">
                            {applicant.pfp ? (
                                    <img src={applicant?.pfp} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                                ):(
                                    
                                    <img
                                    className="round"
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzCHk4vxVX-5J0QrW4fmsT4AjslKpeLnx3A&usqp=CAU'
                                    alt="user"
                                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                />
                                )}
                                
                                <h3 className='mt-2 text-white'>{applicant.firstname}</h3>
                                <p>
                                    {applicant.email}
                                </p>
                                <div className="">
                                    <Link to="/allSoloProject/Profile " className="applicant mx-2  " >Profile</Link>
                                    <button
                                    onClick={() => handleAssignApplicantClick(applicant._id)} 
                                    style={{ backgroundColor: "#211944", color: "white", borderRadius: "5px", padding: "7px 20px", border: "1px solid white" }}>
                                    Assign</button>
                                </div>
                                <div className="skills">
                                    <h6>Skills</h6>
                                    <ul>
                                        {applicant.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                        {applicant.skills.length===0 && <li>No skills</li>}
                                        
                                    </ul>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                )}

              </>
            ) : (
              <p>Loading project details...</p>
            )}
          </div>
        </div>
      </CompanyLayout>
    </>
  );
};

export default FreelancerApplicants;
