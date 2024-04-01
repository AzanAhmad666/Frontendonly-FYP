import React from 'react';
import { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosInformationCircle } from "react-icons/io";
import '../css/createProject.css';
import CompanyLayout from './CompanyLayout';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";




const CreateProject = () => {

  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState('');
  const [description, setDescription] = useState('');
  const [membersRequired, setMembersRequired] = useState('');
  const [addedMembers, setAddedMembers] = useState([]);
  const [budget, setBudget] = useState();
  const [isTeamProject, setIsTeamProject] = useState(true);
  const [deadline, setDeadline] = useState(null);
  const navigate = useNavigate();

  

  const handleAddMember = () => {
  
  
    if (membersRequired.trim() !== '') {
      // If it's a team project and the member input is not empty, add the member
      if (isTeamProject) {
        setAddedMembers((prevMembers) => [...prevMembers, membersRequired]);
      } else {
        // If it's not a team project, allow adding only one member
        if (addedMembers.length === 0) {
          setAddedMembers([membersRequired]);
        }
      }
  
      setMembersRequired(''); // Clear the input field after adding the member
    }
  };

  const handleDeleteMember = (index, event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Remove the member at the specified index from addedMembers
    setAddedMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const fettchapi=(projectTitle,
    projectType,
    description,
    addedMembers,
    budget,
    isTeamProject)=>{
    
      
    try {
      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify({
  "title": projectTitle,
  "description": description,
  "budget": budget,
  "type": projectType,
  "requiresTeam":isTeamProject,
  "requiredMembers":addedMembers,
  "deadline":deadline
});



var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
  credentials:'include'
};

fetch("http://localhost:3000/api/v1/project/post", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if (result.success){
      toast.success(result.message);
      navigate("/CompanyHome");

      
    }
  })
  .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }


  }
  
  
    console.log('State:', {
    projectTitle,
    projectType,
    description,
    membersRequired,
    isTeamProject,
    budget,
    deadline,
    addedMembers
 });


    return( 
    <>
     <CompanyLayout>
      <div className="main-content mx-2 ">
        <div>
            <h1 className="createProjecttext11 mt-5">Create Project</h1>
          <p className="createProjecttext11 mt-2">You can create your project here.</p>
          <form>
            <p className="createProjecttext11 mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Project title:</p>
            <input  className="inputTitle11"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            />
            
            <p className="createProjecttext11 mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Project type:</p>
            <input className="inputTitle11"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            />
            
            
            <p className="createProjecttext11 mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Description:</p>
            <textarea className="textArea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <p className="createProjecttext11 mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Budget (in PKR):</p>
            <input className="inputTitle11"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            />
            <p className="createProjecttext11 mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Deadline:</p>
            <DatePicker
              className='inputTitle11 w-100'
              
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              dateFormat="yyyy-MM-dd"
            />

    <p className="createProjecttext11 mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Team Project:</p>

    <select
      name="dropdown"
      className='dropdownTeamProject'
      onChange={(e) => setIsTeamProject(e.target.value === "option1")}
    >
      <option value="option1">Yes</option>
      <option value="option2">No</option>
    </select>
            
            <p className="createProjecttext11 mt-3"><IoIosInformationCircle className='mx-2 mb-1' style={{fontSize: 'large', color:'#6319B8'}}/>Members Required:</p>
            <div className="row">
              <div className="col-sm-12 col-xs-12 col-lg-6 col-md-6 col-xl-6 col-xxl-12 ">
                <input className="inputTitle11 mt-2"
                value={membersRequired}
                onChange={(e) => setMembersRequired(e.target.value)}
                />
                <input className=" addButton mx-2 mt-2" type="button" value="Add" onClick={handleAddMember} />
              </div>
            </div>
            {/* Display added members */}
            {addedMembers.length > 0 && (
                    <div className="mt-3">
                      <p className="createProjecttext11">Added Members:</p>
                      <div>
                        {addedMembers.map((member, index) => (
                          <div key={index} className="d-flex align-items-center">
                            <span style={{ marginRight: '10px' }}>{index + 1}.</span>
                            <span>{member}</span>
                            <RiDeleteBin6Line
                              className="deleteIcon mx-2 "
                              style={{ fontSize: 'large', color: '#6319B8' }}
                              onClick={(e) => handleDeleteMember(index, e)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* ... (rest of the form) */}
            <div className='d-flex justify-content-center align-items-center'>
            <input className=" submitButton mx-5 mt-5 " type="button" value="Submit"
            onClick={() =>
              fettchapi(
                projectTitle,
                projectType,
                description,
                addedMembers,
                budget,isTeamProject)}
            />
            </div>
          </form>
        </div>;
      </div>
     </CompanyLayout>
  
    </>
    );
}




export default CreateProject;