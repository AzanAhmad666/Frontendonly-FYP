import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import CompanyLayout from "./CompanyLayout";
import { useCookies } from "react-cookie";

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, settype] = useState();
    const navigate = useNavigate();

    const [showAllProjects, setShowAllProjects] = useState(true);
    const [cookies] = useCookies(["token"]);

    useEffect(() => {
        // Fetch projects and update state
        const fetchProjects = async () => {
          try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", `token=${cookies.token}`);
            const response = await fetch(
              "http://localhost:3000/api/v1/project/myAppliedProjects",
              {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
                credentials: "include",
              }
            );
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Fetched projects:", result); // Log the fetched projects
    
            setProjects(result.projects || []); // Use result.projects if it exists, otherwise use an empty array
            setLoading(false);
            settype(result.type);
          } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
          }
        };
    
        if (showAllProjects) {
          fetchProjects();
        }
      }, [showAllProjects]);
    return (
        <CompanyLayout>
            <div className="main-content p-5">
                {type==="team"?(
                    <h1 className="mb-5">Team Projects</h1>
                ):(

                <h1 className="mb-5">My Projects</h1>
                )}
                {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="row">
              {projects.map((project) => (
                <div key={project._id} className="col-md-6 mb-4">
                  <div
                    className="card card-background"
                    style={{ height: "275px" }}
                  >
                    <div className="card-header cardHeader">
                      <span className="projectText ">Project Type:</span>{" "}
                      <span style={{ color: "#424446" }}>{project.type}</span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-4">
                        <span className="projectText fw-bold">
                          Project Title:{" "}
                        </span>
                        <span style={{ color: "#6C7172" }}>
                          {project.title}
                        </span>
                      </h5>
                      <p className="card-text mb-4">
                        <span className="projectText">Budget: </span>
                        <span style={{ color: "#6C7172" }}>
                          {project.budget}
                        </span>
                      </p>
                      <p className="card-text mb-4">
                        <span className="projectText">Required Members: </span>
                        <span style={{ color: "#6C7172" }}>
                          {project.requiredMembers.join(" , ")}
                        </span>
                      </p>
                      <div>

                      <Link
                        to={`/projectDetails/${project._id}`}
                        className="mt-auto p-2 detailButton22"
                        style={{marginRight:5}}
                        onClick={() =>
                          navigate(`/projectDetails/${project._id}`)
                        }
                      >
                        Details
                      </Link>
                      {type === "team" && (
                          
                      <Link
                        to={`/projectDetails/${project._id}`}
                        className="mt-auto p-2 detailButton22"
                        onClick={() =>
                          navigate(`/projectDetails/${project._id}`)
                        }
                      >
                        Assign Tasks
                      </Link>
                      )}

                      
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
            </div>
        </CompanyLayout>
    )
        
}

export default MyProjects