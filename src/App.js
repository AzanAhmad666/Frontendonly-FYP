import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import CreateProject from './components/CreateProject';
import UserTypeSelection from './components/UserTypeSelection';


function App() {
  return (
    <div className="App">
  
      <Routes>
              <Route path="/" element={<UserTypeSelection />} />
              <Route path="/createProject" element={<CreateProject />} />
            </Routes>
    </div>
  );
}

export default App;
