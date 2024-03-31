import React, { useState, useEffect } from "react";
import "../css/freelancerProfile.css";
import profileLogo from "../images/profile-logo.jpg";
import CompanyLayout from "./CompanyLayout";
function ShowProfile() {
    return (
        <CompanyLayout>
            <div className="main-content">
                <div className="containerProfile">
                    <div className="logo-container">
                        <img src={profileLogo} alt="profile logo" />
                        <br />                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            accept="image/*"
                        />
                        <p className="fw-bold"
                            style={{ color: "#2E085A" }}
                        >Azab Ahmed </p>
                    </div>
                    <div className="data-container">
                        <label htmlFor="aboutme">About me </label>
                        <input
                            type="text"
                            name="aboutme"
                            id="aboutme"
                            placeholder="I am a developer"
                        />
                        <div className="section-header">
                            <label className="section-title" htmlFor="education">
                                Skills
                            </label>
                        </div>
                        <div className="education-div">
                            Skills
                        </div>
                        <div className="section-header">
                            <label className="section-title" htmlFor="education">
                                Education
                            </label>
                        </div>
                        <div className="education-div">
                            EDUCATION
                        </div>
                        <div className="section-header">
                            <label className="section-title">Experience</label>
                        </div>
                        <div className="experience-container mb-5">
                            <div className="section-header"></div>
                            EXPERIENCES
                        </div>
                    </div>
                </div>
            </div>
        </CompanyLayout>
    );
}
export default ShowProfile;
