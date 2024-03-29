import React, { useState, useEffect } from "react";
import "../css/freelancerProfile.css";
import Sidebar from "./Sidebar";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import profileLogo from "../images/profile-logo.jpg";
import CompanyLayout from "./CompanyLayout";

function FreelancerProfile() {
  const [skills, setSkills] = useState([""]);
  const [cookies, setCookie] = useCookies(["token"]);
  const [image, setImage] = useState(null);
  const [aboutme, setAboutme] = useState("");
  const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
  const [experiences, setExperiences] = useState([
    { jobtitle: "", company: "", startDate: "", endDate: "" },
  ]);
  const [education, setEducation] = useState([
    { institution: "", course: "", startDate: "", endDate: "" },
  ]);

  function addEducationEntry() {
    setEducation([
      ...education,
      { institution: "", course: "", startDate: "", endDate: "" },
    ]);
  }

  function removeEducationEntry(index) {
    setEducation(education.filter((_, i) => i !== index));
  }

  function handleEducationChange(index, field, value) {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  }

  function addExperience() {
    setExperiences([
      ...experiences,
      { jobtitle: "", company: "", startDate: "", endDate: "" },
    ]);
  }

  function removeExperience(index) {
    setExperiences(experiences.filter((_, i) => i !== index));
  }

  function handleExperienceChange(index, field, value) {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  }
  function addSkill() {
    setSkills([...skills, ""]);
  }

  function removeSkill(index) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  function handleSkillChange(index, value) {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('filename',file);
      const requestOptions = {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Cookie": `token=${cookies.token}`,
        },
      };
      fetch("http://localhost:3000/api/v1/uploadFile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setImage(result.url); // Set the image URL in state
          toast.success("Image uploaded successfully");
        } else {
          throw new Error(result.message);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        toast.error(error.message);
      });
  }
}
      
  function saveProfileChanges() {

    try{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie",`token=${cookies.token}`);

    const raw = JSON.stringify({
      aboutme: aboutme,
      skills: skills.filter((skill) => skill.trim() !== ""), // Filter out empty skills
      education: education,
      experience: experiences,
      pfp:image,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials:"include",
    };

    fetch(
      "http://localhost:3000/api/v1/Freelancer/updateprofile",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.message) {
          toast.success(result.message);
        } else {
          console.log(result.error);
          toast.error(result.error);
        }
  })
  .catch((error) => console.error(error));
} catch (err) {
    console.log("Error: ", err);
  }
};

useEffect(() => {

      try {
        const myHeaders = new Headers();
      myHeaders.append("Cookie", `token=${cookies.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };

         fetch("http://localhost:3000/api/v1/Freelancer/details",requestOptions) 
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (result.success) {
                const freelancer = result.freelancer;
                setAboutme(freelancer.aboutme);
          setSkills(freelancer.skills);
          setFirstname(freelancer.firstname);
           setLastname(freelancer.lastname);
          setEducation(freelancer.education);
          setExperiences(freelancer.experience);
          setImage(freelancer.pfp);
              }
              else{
                console.log(result.message);
              }
              })
              .catch((error) => console.error(error));
            }
            catch (err) {
                console.log("Error: ", err);
              }
            }, []);
  
       
  
  

  return (
    <CompanyLayout>
      <div className="main-content">
        <div className="containerProfile">
          <div className="logo-container">
            <img src={image || profileLogo} alt="profile logo" />
            <p>{firstname} {lastname}</p>
            <button
              class="profile-btn"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Add Picture
            </button>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="data-container">
            <label htmlFor="aboutme">About me </label>
            <input
              type="text"
              value={aboutme}
              onChange={(e) => setAboutme(e.target.value)}
              name="aboutme"
              id="aboutme"
              placeholder="I am a developer"
            />
            <div id="skills-container">
              <div className="input-row">
                <label htmlFor="skill">Skills</label>
                <button onClick={addSkill}>+</button>
              </div>
              {skills.map((skill, index) => (
                <div key={index} className="input-row">
                  <input
                    type="text"
                    name="skill"
                    placeholder={`Skill ${index + 1}`}
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    style={{
                      width: "150px",
                      height: "28px",
                      marginTop: "15px",
                    }}
                  />
                  <button
                    className="remove-skill"
                    onClick={() => removeSkill(index)}
                    style={{
                      color: "#2E085A",
                      border: "none",
                      cursor: "pointer",
                      marginLeft: "10px",
                      fontSize: "20px",
                      fontWeight: "bolder",
                      background: "none",
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div className="section-header">
              <label className="section-title" htmlFor="education">
                Education
              </label>
              <button onClick={addEducationEntry} className="add-button">
                +
              </button>
            </div>

            <div className="education-div">
              {education.map((edu, index) => (
                <div key={index} className="education-entry-container mb-5">
                  <div className="education-entry">
                    <div className="education-input">
                    <label htmlFor={`institution-${index}`}>Institution:</label>
                      <input
                        type="text"
                        id={`institution-${index}`}
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        name=""
                        placeholder="Comsats university Islamabad"
                      />
                    </div>
                    <div className="education-input">
                    <label htmlFor={`course-${index}`}>Course:</label>
                      <input
                        type="text"
                        id={`course-${index}`}
                        value={edu.course}
                        onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                        name=""
                        placeholder="Bachelor's in Computer Science"
                      />
                    </div>
                    <div className="education-input">
                    <label htmlFor={`startDate-${index}`}>StartDate:</label>
                      <input
                        type="text"
                        id={`startDate-${index}`}
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        name=""
                        placeholder="2024-03-12-current"
                      />
                    </div>
                    <div className="education-input">
                    <label htmlFor={`endDate-${index}`}>EndDate:</label>
                      <input
                        type="text"
                        id={`endDate-${index}`}
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        name=""
                        placeholder="2024-03-12-current"
                      />
                    </div>
                  </div>
                  <button
                    className="remove-education-entry"
                    onClick={() => removeEducationEntry(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div className="section-header">
              <label className="section-title">Experience</label>
              <button onClick={addExperience} className="add-button">
                +
              </button>
            </div>

            <div className="experience-container mb-5">
              <div className="section-header"></div>
              {experiences.map((experience, index) => (
                <div key={index} className="experience-entry-container ">
                  <div className="experience-entry">
                    <div className="form-group">
                      <label htmlFor={`jobtitle-${index}`}>Job Title: </label>
                      <input
                        id={`jobtitle-${index}`}
                        type="text"
                        placeholder="Job Title"
                        value={experience.jobtitle}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "jobtitle",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`company-${index}`}>Company: </label>
                      <input
                        id={`company-${index}`}
                        type="text"
                        placeholder="Company"
                        value={experience.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`startDate-${index}`}>Start Date: </label>
                      <input
                        id={`startDate-${index}`}
                        type="text"
                        placeholder="Start Date"
                        value={experience.startDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`endDate-${index}`}>End Date: </label>
                      <input
                        id={`endDate-${index}`}
                        type="text"
                        placeholder="End Date"
                        value={experience.endDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="remove-experience"
                    onClick={() => removeExperience(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div onClick={() => saveProfileChanges()} class="last-button">
              <button class="save-btn">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
}
export default FreelancerProfile;
