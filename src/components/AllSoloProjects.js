import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import "../css/allSoloProjects.css";
import { useCookies } from "react-cookie";

import CompanyLayout from "./CompanyLayout";
import { useCookies } from "react-cookie";


const AllSoloProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(true);
  const [cookies, setCookie] = useCookies(["token", "companyID", "company"]);

  const searchRef = useRef(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setShowAllProjects(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement your search functionality here
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/project/searchProject",
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          redirect: "follow",
          body: JSON.stringify({
            title: searchTerm,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Searched projects:", result); // Log the fetched projects

      setProjects(result.project); // Use result.projects if it exists, otherwise use an empty array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowAllProjects(true);
        setSearchTerm("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fetch projects and update state
    const fetchProjects = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Cookie",
          `token=${cookies.token}`
        );

        

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
          credentials:'include'
        };

        fetch(
          "http://localhost:3000/api/v1/Project/getmyFreelancerprojects",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            if(result.success){
              console.log("Fetched projects:", result); // Log the fetched projects

        setProjects(result.data || []); // Use result.projects if it exists, otherwise use an empty array
        setLoading(false);
            }
          })
          .catch((error) => console.error(error));
        
      } 
      catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    if (showAllProjects) {
      fetchProjects();
    }
  }, [showAllProjects]); // Empty dependency array means this effect will run once when the component mounts

  return (
    <>
      <CompanyLayout>
       
        <div className="main-content p-5">
          <h1 className="createProjecttext mt-2 mb-5">These are your Projects for Freelancers</h1>
          <div className="search22 mb-4" ref={searchRef}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search Projects"
                name="search"
                className="search-inputprojects"
                value={searchTerm}
                onChange={handleChange}
              />
              <button type="submit" className="border-0 bg-transparent">
                <IoSearchOutline color="#6319B8" />
              </button>
            </form>
          </div>
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
                     
                     <div className="d-flex gap-3">
                     <Link
                        to={`/projectDetails/${project._id}`}
                        className="px-2 py-2 detailButton25"
                        onClick={() =>
                          navigate(`/projectDetails/${project._id}`)
                        }
                      >
                        Check Progress
                      </Link>

                      <Link
                        to="/allSoloProject/details"
                        className="px-2 py-2  detailButton26"
                       
                      >
                       View Applicant
                      </Link>
                     </div>
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CompanyLayout>
    </>
  );
};

export default AllSoloProjects;
