import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import "../css/allProject.css";
import CompanyLayout from "./CompanyLayout";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllProjects, setShowAllProjects] = useState(true);
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
        const response = await fetch(
          "http://localhost:3000/api/v1/project/getFreelancerProjects",
          {
            method: "GET",
            headers: new Headers({
              Cookie:
                "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNzMyZDYzNjUzNGUzNzgyNTBjMjUiLCJpYXQiOjE3MDIwNjQ5NjZ9.In6HZLkcWb75kuVErmvwQ41XiUXiPuMKaqnsFI14ymI",
              "Content-Type": "application/json",
            }),
            redirect: "follow",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched projects:", result); // Log the fetched projects

        setProjects(result.projects || []); // Use result.projects if it exists, otherwise use an empty array
        setLoading(false);
      } catch (error) {
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
          <h1 className="createProjecttext mt-2 mb-5">Solo Projects</h1>
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
                      <Link
                        to={`/projectDetails/${project._id}`}
                        className="mt-auto  detailButton22"
                        onClick={() =>
                          navigate(`/projectDetails/${project._id}`)
                        }
                      >
                        Details
                      </Link>
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

export default AllProjects;
