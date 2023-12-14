import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import CreateProject from './components/CreateProject';
import UserTypeSelection from './components/UserTypeSelection';
import AllProjects from './components/AllProjects';
import Login from './components/login';
import Signup from './components/Signup.js';



function App() {
  return (
    <div className="App">
  
      <Routes>
              <Route path="/" element={<UserTypeSelection />} />
              <Route path="/createProject" element={<CreateProject />} />
              <Route path="/allProjects" element={<AllProjects />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
    </div>
  );
}

export default App;
