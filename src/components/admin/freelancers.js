import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import "../../css/allProject.css";

export default function Freelancers({ applicants }) {
    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchTerm("");
          }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleApplicantClick = ()=>{
        console.log("clicked")
    }

    const filteredApplicants = searchTerm
        ? applicants.filter((applicant) =>
            {
                if(applicant.firstname){
                    return applicant.firstname.toLowerCase().includes(searchTerm.toLowerCase())
                }
                else{
                    return applicant.companyname.toLowerCase().includes(searchTerm.toLowerCase())
                }
            }
            
          )
        : applicants;

    return (
        <div>
            <div className="flex justify-end mb-4 gap-1" ref={searchRef}>
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    className="rounded-lg search-inputprojects"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="border-0 bg-transparent">
                    <IoSearchOutline color="#6319B8" size={25} />
                </button>
            </div>

            {filteredApplicants?.length ? (
                <div className="solo-applicant-card">
                {filteredApplicants.map((applicant, index) => (
                    <div key={index} className="d-flex justify-center my-5">
                        <div className="card-container">
                            {applicant.pfp ? (
                                <img
                                    src={applicant?.pfp}
                                    className='flex justify-center mx-auto object-cover'
                                    alt="Profile"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                <img
                                    className="round flex justify-center mx-auto object-cover"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvzCHk4vxVX-5J0QrW4fmsT4AjslKpeLnx3A&usqp=CAU"
                                    alt="user"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                    }}
                                />
                            )}
                            <h3 className="mt-2 text-white">
                                {applicant.firstname || applicant.companyname}
                            </h3>
                            <p>{applicant.email}</p>
                            <div>
                                {/* <Link
                                    to="/allSoloProject/Profile"
                                    className="applicant mx-2"
                                >
                                    Profile
                                </Link> */}
                                <button
                                    onClick={() => handleApplicantClick(applicant._id)}
                                    style={{
                                        backgroundColor: "#211944",
                                        color: "white",
                                        borderRadius: "5px",
                                        padding: "7px 20px",
                                        border: "1px solid white",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="skills h-32">
                                {applicant.skills ? (
                                    <>
                                    <h6>Skills</h6>
                                    <ul>
                                    {applicant.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                    {applicant.skills.length === 0 && (
                                        <li>No skills</li>
                                    )}
                                    </ul>
                                    </>
                                ):(
                                    <>
                                    <h6>Business Address</h6>
                                    <p>{applicant.businessAddress}</p>
                                    </>

                                )}
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            ):
            <p className="text-center">No Applicants Found</p>}

            
        </div>
    );
}
