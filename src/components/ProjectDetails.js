import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosInformationCircle } from "react-icons/io";
import "../css/createProject.css";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CompanyLayout from "./CompanyLayout";


const ProjectDetails = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "freelancer", "freelancerID"]);

  //If my projects then not show apply button
  const containsProjectDetails = window.location.pathname.includes('myProjects');

  //If as team apply on projects then call api of apply as team
  const containsAvailableTeamProjects = window.location.pathname.includes('availableTeamProjects');
  //console.log(containsAvailableTeamProjects)
  //console.log(containsProjectDetails)

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        //console.log(cookies.token)
        //console.log(cookies.freelancerID)
        const response = await fetch(
          `http://localhost:3000/api/v1/project/getProject/${id}`,
          {
            method: "POST",
            headers: new Headers({
              Cookie: `token=${cookies.token}`, // Replace with your auth token
              "Content-Type": "application/json",
            }),
            redirect: "follow",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched project details:", result);

        setProjectDetails(result.project); // Set the project details in the state
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]); // Include id in the dependency array to re-fetch details when id changes
  const handleApplyClick = async (e) => {
    e.preventDefault();
    try {

      const apiURL = containsAvailableTeamProjects ? `http://localhost:3000/api/v1/project/applyToProjectasTeam/${id}` : `http://localhost:3000/api/v1/project/applyToProject/${id}`;
      console.log(apiURL)
      const response = await fetch(apiURL,
        {
          method: "POST",
          headers: new Headers({
            Cookie: `token=${cookies.token}`, // Include the token in the request headers
            "Content-Type": "application/json",
          }),
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
        toast.success("Application successful");
        navigate("/AvailableTeamProjects");
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
                  {/* Apply button */}
                  {!containsProjectDetails && (
                    
                  <div className="text-center mt-5">
                    <button
                      className="submitButton py-3 px-5 "
                      style={{ borderRadius: "4px" }}
                      onClick={handleApplyClick}
                    >
                      Apply
                    </button>
                  </div>
                  )}

                </form>
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

export default ProjectDetails;
