import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CompanyLayout from "../CompanyLayout";
import { GiProgression } from "react-icons/gi";


import {
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBTypography,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const CheckProgress = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [selectedApplicant, setselectedApplicant] = useState(null);
  const [teamSkills, setteamSkills] = useState(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "freelancer", "freelancerID"]);

  //If my projects then not show apply button
  const containsFreelancer = window.location.pathname.includes('freelancer');


  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        //console.log(cookies.token)
        //console.log(cookies.freelancerID)
        const response = await fetch(
          `http://localhost:3000/api/v1/Company/project/${id}`,
          {
            method: "GET",
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

        setProjectDetails(result.result.title); // Set the project details in the state
        if (containsFreelancer){
            setselectedApplicant(result.result.selectedApplicant)
        }else{

            setselectedApplicant(result.result.selectedTeam)
            setteamSkills(result.result.teamSkills)
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]); // Include id in the dependency array to re-fetch details when id changes
  
  return (
    <>
      <CompanyLayout>
        <div className="main-content p-5">
          <div>
            <h1 className="createProjecttext mt-5">Project Details</h1>
            
            {selectedApplicant ? (
                <div>
                    <h3 className="my-4">Title: {projectDetails}</h3>
                    {containsFreelancer ? (
                    <div className=" solo-applicant-card">
                        
                            
                            <div className='d-flex justify-center my-5'>
                            <div className="card-container ">
                            {selectedApplicant.pfp ? (
                                    <img src={selectedApplicant?.pfp} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                                ):(
                                    
                                    <img
                                    className="round"
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzCHk4vxVX-5J0QrW4fmsT4AjslKpeLnx3A&usqp=CAU'
                                    alt="user"
                                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                />
                                )}
                                
                                <h3 className='mt-2 text-white'>{selectedApplicant.firstname}</h3>
                                <p>
                                    {selectedApplicant.email}
                                </p>
                                <div className="">
                                    <Link to="/allSoloProject/Profile " className="applicant mx-2  " >Profile</Link>
                                    <button
                                    style={{ backgroundColor: "#211944", color: "white", borderRadius: "5px", padding: "7px 20px", border: "1px solid white" }}>
                                    View Progress</button>
                                </div>
                                <div className="skills">
                                    <h6>Skills</h6>
                                    <ul>
                                        {selectedApplicant.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                        {selectedApplicant.skills.length===0 && <li>No skills</li>}
                                        
                                    </ul>
                                </div>
                            </div>
                            </div>
                        
                    </div>
                ):(
                    <div className="team-applicant-card">
                            <div>
                                <MDBCard className="mb-5" style={{ borderRadius: '15px', marginBottom: "10px",backgroundColor:'#211944', color:'white'  }}>
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag='h3'>{selectedApplicant.name}</MDBTypography>
                                    
                                    <div className="skills mt-4" style={{backgroundColor:"#211944"}}>
                                        <h6 className="mb-4">Team Members Skills</h6>
                                        <ul >
                                            {teamSkills.map((skill, index) => (
                                                <li key={index}  style={{border:"1px solid white", borderRadius:"5px"}}>{skill}</li>
                                            ))}
                                            {teamSkills===null && <li>No skills</li>}
                                        </ul>
                                    </div>
                                    
                                    <hr className="my-4" />
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <MDBCardText style={{ display: "flex", alignItems: "center" }} className="text-uppercase mb-0">
                                        <MDBIcon fas icon="users me-2" /> <span className=" small" style={{marginRight:"20px"}}>Team Members</span>
                                    
                                        <div>
                                            {selectedApplicant.members.map((member, index) => (
                                                <div style={{ display: "inline-block", marginRight: "10px" }} key={index}>
                                                    {member?.pfp ? (
                                                            <img src={member?.pfp} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                                        ):(
                                                            
                                                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzCHk4vxVX-5J0QrW4fmsT4AjslKpeLnx3A&usqp=CAU' height={40} width={40}/>
                                                        )}
                                                </div>
                                            ))}
                                        </div>
                                    </MDBCardText>
                                    
                                        
                                        <div 
                                            className="assignProjectToTeamBtn">
                                            <GiProgression style={{marginRight:"5px"}}/> Check Progress
                                        </div>
                                    </div>
                                    
                                </MDBCardBody>
                                </MDBCard>

                            </div>
                        
                    </div>
                )}
                </div>
              
            ) : (
              <h4>Not Assigned yet</h4>
            )}
          </div>
        </div>
      </CompanyLayout>
    </>
  );
};

export default CheckProgress;
