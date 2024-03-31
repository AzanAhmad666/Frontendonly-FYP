import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import CreateProject from './components/CreateProject';
import UserTypeSelection from './components/UserTypeSelection';
import AllTeamProjects from './components/AllTeamProjects';
import AllSoloProjects from './components/AllSoloProjects';
import AllProjects from './components/AllProjects';
import TeamProjects from './components/teams/AvailableTeamProjects.js';
import MyProjects from './components/MySoloProjects.js';
import Login from './components/login';
import Signup from './components/Signup.js';
import LoginFreelacner from './components/LoginFreelancer.js';
import SignupFreelancer from './components/SignupFreelancer.js';
import ProjectDetails from './components/ProjectDetails';
import ForgetPasswordForm from './components/ForgetPasswordForm';
import ForgetPasswordFormCompany from './components/ForgetPasswordFormCompany';
import FreelancerHome from './components/FreelancerHome';
import CompanyHome from './components/CompanyHome';
import FreelancerProfile from './components/FreelancerProfile';
import Tasks from './components/tasks/Tasks';
import OngoingTeamProjects from './components/teams/OngoingTeamProjects.js';

import ShowProfile from './components/ShowProfile';
import FreelancerApplicants from './components/company/freelancerApplicants.js';
import CheckProgress from './components/company/CheckProgress.js';




const App = () => {
  const [cookies] = useCookies(['token']); // Read 'jwt' cookie
  

  const isAuthenticated = () => {
    return cookies.token ? true : false; // Check if 'jwt' cookie exists
  };

  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
              <Route path="/" element={<UserTypeSelection />} />

              {/*Company Routes*/}
              <Route path="/createProject" element={isAuthenticated() ? <CreateProject /> : <Navigate to="/" />} />
              <Route path="/allTeamProject" element={<AllTeamProjects />} />
              <Route path="/allSoloProject" element={<AllSoloProjects />} />

              <Route path="/allProjects" element={<AllProjects />} />

              <Route path="/AvailableTeamProjects" element={<TeamProjects />} />
              <Route path="/OngoingTeamProjects" element={<OngoingTeamProjects />} />

              <Route path="/SoloProjects" element={<MyProjects />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginfreelancer" element={<LoginFreelacner />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signupfreelancer" element={<SignupFreelancer />} />

              <Route path="/projectDetails/:id" element={<ProjectDetails />} />
              <Route path="/AvailableTeamProjects/projectDetails/:id" element={<ProjectDetails />} />
              <Route path="/myProjects/projectDetails/:id" element={<ProjectDetails />} />

              <Route path="/team/checkProgress/:id" element={<CheckProgress />} />
              <Route path="/freelancer/checkProgress/:id" element={<CheckProgress />} />
              

              <Route path="/forgetpassword" element={<ForgetPasswordForm />} />
              <Route path="/forgetpasswordCompany" element={<ForgetPasswordFormCompany />} />

              <Route path="/FreelancerHome" element={<FreelancerHome />} />
              <Route path="/CompanyHome" element={<CompanyHome />} />

              <Route path="/freelancerProfile" element={<FreelancerProfile />} />
              <Route path="/allTeamProject" element={<AllTeamProjects />} />
              <Route path="/allSoloProject" element={<AllSoloProjects />} />
              <Route path="/allSoloProject/applicants/:id" element={<FreelancerApplicants />} />
              <Route path="/allTeamProject/applicants/:id" element={<FreelancerApplicants />} />
              <Route path="/allSoloProject/Profile" element={<ShowProfile />} />
              <Route path="/tasks/:id" element={<Tasks />} />
            </Routes>
    </div>
  );
}

export default App;