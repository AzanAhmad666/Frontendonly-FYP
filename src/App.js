import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreateProject from './components/CreateProject';
import UserTypeSelection from './components/UserTypeSelection';
import AllProjects from './components/AllProjects';
import Login from './components/login';
import Signup from './components/Signup.js';
import LoginFreelacner from './components/LoginFreelancer.js';
import SignupFreelancer from './components/SignupFreelancer.js';
import ProjectDetails from './components/ProjectDetails';
import ForgetPasswordForm from './components/ForgetPasswordForm';




function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
              <Route path="/" element={<UserTypeSelection />} />
              <Route path="/createProject" element={<CreateProject />} />
              <Route path="/allProjects" element={<AllProjects />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginfreelancer" element={<LoginFreelacner />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signupfreelancer" element={<SignupFreelancer />} />
              <Route path="/projectDetails/:id" element={<ProjectDetails />} />
              <Route path="/forgetpassword" element={<ForgetPasswordForm />} />
            </Routes>
    </div>
  );
}

export default App;
