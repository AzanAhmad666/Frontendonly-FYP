import React from 'react'
import { Link } from 'react-router-dom';
import "../css/applicantDetaills.css"
import CompanyLayout from "./CompanyLayout";
export default function ApplicantDetails() {
    return (
        <>
            <CompanyLayout>
                <div className='d-flex justify-center my-5'>
                    <div className="card-container ">
                        <img
                            className="round"
                            src="https://randomuser.me/api/portraits/women/79.jpg"
                            alt="user"
                        />
                        <h3 className='mt-2 text-white'>Aan Ahmed</h3>
                        <p>
                            azanahmad666@gmail.com
                        </p>
                        <div className="">
                            <Link to="/allSoloProject/Profile " className="applicant ">Profile</Link>
                        </div>
                        <div className="skills">
                            <h6>Skills</h6>
                            <ul>
                                <li>UI / UX</li>
                                <li>Front End Development</li>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                                <li>React</li>
                                <li>Node</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CompanyLayout>
        </>
    )
}
