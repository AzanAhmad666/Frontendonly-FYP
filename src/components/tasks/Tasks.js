import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import CompanyLayout from '../CompanyLayout'
import TasksDisplay from './TasksDisplay'; // Import the TasksDisplay component
import {useCookies} from 'react-cookie'
import { toast } from 'react-toastify';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { Chip, Typography, Button,Input, Modal, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker styles
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Tasks() {
  const { id } = useParams();

  const [tasks, settasks] = useState()
  const [cookies, setcookies] = useCookies(['token'])
  const [open, setOpen] = useState(false);
  const [refresh, setrefresh] = useState(true);
  const [selectedMemberId, setSelectedMemberId] = useState([]);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [members, setmembers] = useState([])
  const [progress, setprogress] = useState();
  const [showprogress, setshowprogress] = useState(false)
  const [completedTasks, setcompletedTasks] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [status, setStatus]=useState('');
  const [finalizeModalOpen, setFinalizeModalOpen] = useState(false)
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);  // New state for the dispute modal
  const [disputeDescription, setDisputeDescription] = useState('');
  const [disdescription, setDisdescription] = useState('');


  const containsCompany= window.location.pathname.includes("company");

useEffect(() => {
  
  // Fetch team details
  const fetchTeamDetails = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Cookie", `token=${cookies.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };

      const teamResponse = await fetch(
        "http://localhost:3000/api/v1/Freelancer/fetchteam",
        requestOptions
      );
      const teamResult = await teamResponse.json();

      if (teamResult.success) {
        setmembers(teamResult.freelancer.teams.members);
      } else {
        console.log(teamResult.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  

  
  const initialize = async () => {
    await fetchTeamDetails();
    //await fetchProjectDetails();
  };
  if(!containsCompany){

  initialize();
  }
}, []);

useEffect(() => {
  if (status === "disputed") {
    fetchDisputeDescription();
  }
}, [status, id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinalizeOpen = () => setFinalizeModalOpen(true);
  const handleFinalizeClose = () => {
    setFinalizeModalOpen(false);
    setDisputeModalOpen(false);  // Close dispute modal when the main modal is closed
  };

  const fetchDisputeDescription = () => {
    fetch(`http://localhost:3000/api/v1/dispute/project/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.description) {
        setDisputeDescription(data.description);
      } else {
        toast.error('No dispute found for this project');
      }
    })
    .catch(error => {
      console.error('Error fetching dispute description:', error);
      toast.error('Error fetching dispute details');
    });
  };

  const completeProject = () => {
    const url = `http://localhost:3000/api/v1/project/${id}/completeRequest`; // Adjust the URL to your endpoint
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `token=${cookies.token}`);
    
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      credentials: 'include'  // Include cookies if needed for session handling
    };
  
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          toast.success('Project marked as complete. Awaiting approval.');
          window.location.reload();
          // You might want to trigger a refresh or update state here
        } else {
          toast.error('Failed to mark project as complete: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Error completing project.');
      });
  };

  const handleDisputeSubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `token=${cookies.token}`);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        description: disputeDescription,
        projectId: id 
      })
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/v1/dispute/create`, requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        toast.success('Dispute raised successfully');
        setDisputeModalOpen(false);
        setDisputeDescription(''); // Clear the dispute description
      } else {
        toast.error('Failed to raise dispute: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to raise dispute');
    }
  };

  const completeProjectCompany = () => {
    const url = `http://localhost:3000/api/v1/project/${id}/complete`; // Adjust the URL to your endpoint
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `token=${cookies.token}`);
    
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      credentials: 'include'  // Include cookies if needed for session handling
    };
  
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          toast.success('Project completed. .');
          // You might want to trigger a refresh or update state here
        } else {
          toast.error('Failed to mark project as complete: ' + result.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Error completing project.');
      });
  };

  const raiseDispute = () => {
    // Logic to handle dispute raising
    //toast.info("Dispute raised!");
    setDisputeModalOpen(true);
    //handleFinalizeClose();
    // Open dispute modal or handle dispute logic
  };
  

  const handleSave = () => {
    // Call API to create task with assigneeId and projectId
    //console.log('Creating task with assigneeId:', assigneeId, 'and projectId:', projectId);
    // console.log('Selected Member ID:', selectedMemberId);
    // console.log('Description:', description);
    // console.log('Deadline:', deadline);

    if(!selectedMemberId){
      toast.error('Please select a member')
      return
    }
    if(!description){
      toast.error('Please add description')
      return
    }
    if(!deadline){
      toast.error('Please add deadline')
      return
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `token=${cookies.token}`);
    
    const raw = JSON.stringify({
      "memberId": selectedMemberId,
      "description": description,
      "deadline": deadline
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials:'include'
    };
    
    fetch(`http://localhost:3000/api/v1/Freelancer/${id}/addTask`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if(result.success){
          toast.success(result.message)
          setrefresh(!refresh)
          // Reset form fields
        setSelectedMemberId([])
        setDescription('');
        setDeadline(null);
    
        // Close modal
        setOpen(false);
        }
        else{
          toast.error(result.error)
        }
      })
      .catch((error) => console.error(error));
    
        

  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", `token=${cookies.token}`);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials:'include'
    };
    const apiURL = containsCompany ? `http://localhost:3000/api/v1/Company/${id}/getTasks` : `http://localhost:3000/api/v1/Freelancer/${id}/getTasks`
    
    fetch(apiURL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        settasks(result.tasks)
        setcompletedTasks(result.tasks.filter((task) => task.status==="completed"))

        
      })
      .catch((error) => console.error(error));
  }, [refresh])

  useEffect(() => {
    
    if(completedTasks.length>0 && tasks.length>0){
      setprogress(((completedTasks?.length / tasks?.length) * 100).toFixed())
      if(completedTasks.length===tasks.length){
        setprogress(100)
      }
      setshowprogress(true)
    }
  }, [completedTasks,tasks])

  useEffect(()=>{

    const fetchProjectDetails = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
       // myHeaders.append("Cookie", `token=${cookies.token}`);
  
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({}),
          redirect: "follow",
          //credentials: "include",
        };
  
        const projectResponse = await fetch(
          `http://localhost:3000/api/v1/project/getProject/${id}`, // Use useParams id
          requestOptions
        );
        const projectResult = await projectResponse.json();
  
        if (projectResult.success) {
          setStatus(projectResult.project.status);
        } else {
          console.log(projectResult.message);
        }
      } catch (error) {
        console.error("Error fetching project details: ", error);
      }
    };

    fetchProjectDetails();
  })

//   const testAPI = async () => {
// const response = await axios.post('http://localhost:3000/api/v1/payment/transfer-funds',{projectId:id});

//   }

  return (
    <CompanyLayout>
        <div className='main-content p-5' style={{margin:"20px", padding:"10px"}}>
          <div className='mb-3'
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <h1 className="createProjecttext">Tasks</h1>

              {!containsCompany&&(
          <div>
            <span style={{color:'#6319b8', fontWeight:'bold'}}> Project Status:</span> {status === "complete_request" ? "Waiting for company's approval" : status}
          </div>
        )}
              {!containsCompany && (
              <div 
              onClick={handleOpen} className="applyAsTeamBtn" style={{display:"flex",alignItems:"center",gap:8,border:"1px solid #2E085A", borderRadius:"8px", padding:"10px", cursor:"pointer"}} >
              <GrAdd size={18} />
              <div>Create Task</div>
              </div>
              )}
              {containsCompany&&(
          <div>
            <span style={{color:'#6319b8', fontWeight:'bold'}}> Project Status:</span> {status === "complete_request" ? "Waiting your approval" : status}
          </div>
        )}
          </div>
          {!containsCompany && status === "disputed" && (
        <div>
          <span style={{color:'#6319b8', fontWeight:'bold'}}>Dispute Description:</span>
          {disputeDescription ? <p>{disputeDescription}</p> : <p>Loading dispute details...</p>}
        </div>
      )}
          <div style={{padding:"20px"}}>
            {tasks?.length===0 ? (
          <h3 className='mb-3'>No tasks yet</h3>
          ):(

          <h3 className='mb-3'>Completed {completedTasks?.length} out of {tasks?.length} tasks</h3>
            )}

          
          {showprogress && ( // Render progress bar only when progress is not null
          <ProgressBar style={{ height: 15, borderRadius:"8px" }} variant="success" now={progress} label={`${progress}%`} />
          )}
          </div>
          
          
          
            
          
          <Modal open={open} onClose={handleClose}>
        <div style={{display:'flex',width:'400px',borderRadius:'8px', flexDirection:'column', position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: 20 }}>
          <Typography variant="h6"className='mb-5'>Create Task</Typography>
          <FormControl className='mb-3' style={{ marginBottom: 10 }}>
  <InputLabel>Select Members</InputLabel>
  <Select
    multiple
    value={selectedMemberId}
    onChange={(e) => {
      setSelectedMemberId(e.target.value);
      setSelectOpen(false); // Close the dropdown after selection
    }}
    open={selectOpen} // Controlled open state
    onOpen={() => setSelectOpen(true)} // Handle dropdown open
    onClose={() => setSelectOpen(false)} // Handle dropdown close
    renderValue={(selected) => (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {selected.map(value => (
          <Chip key={value} label={members.find(member => member._id === value).firstname} style={{ margin: 2 }} />
        ))}
      </div>
    )}
  >
    {members.map(member => (
      <MenuItem key={member._id} value={member._id}>
        {member.firstname}
      </MenuItem>
    ))}
  </Select>
</FormControl>
          <Input className='mb-3' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: 10 }} />
          <DatePicker
              className='mb-5 w-100'
              placeholderText='Deadline'
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              dateFormat="yyyy-MM-dd"
            />
          <Button  style={{ marginTop: 10 }} onClick={handleSave} variant="contained" color="primary">Save Changes</Button>
        </div>
          </Modal>

          {/* Render TasksDisplay component with tasks */}
          <TasksDisplay tasks={tasks || []} />
        </div>
        {!containsCompany &&  completedTasks.length>0 && tasks.length>0 && status!=='complete_request' && (
        <Button onClick={completeProject} style={{marginLeft: '6px', marginBottom:'6px'}} variant="contained" color="primary">Complete</Button>
        )}
        
        {/* Finalize Project Modal */}
        <Modal open={finalizeModalOpen} onClose={handleFinalizeClose}>
    <Box sx={style}>
      <Typography className='text-center' variant="h6" gutterBottom>Finalize Project</Typography>
      {status === 'disputed' ? (
        <Typography className='text-center' style={{ marginTop: 20 }}>Dispute is raised. Please wait for the team's response.</Typography>
      ) : (
        <>
          <Typography>Choose your action:</Typography>
          <div className='mt-4 mb-3'>
            <Button onClick={completeProjectCompany} color="primary">Approve</Button>
            <Button onClick={raiseDispute} color="secondary" style={{ float: 'right' }}>Raise Dispute</Button>
          </div>
        </>
      )}
    </Box>
</Modal>

      {/* Dispute Modal */}
      <Modal open={disputeModalOpen} onClose={() => setDisputeModalOpen(false)}>
        <Box sx={{ ...style, width: 550 }}>
          <Typography className='text-center' variant="h6" gutterBottom>Dispute Project</Typography>
          <Typography className=' mb-3'>Please provide details of the dispute:</Typography>
          {/* Inputs and controls for submitting dispute details */}
          
          <textarea 
          className='mx-4 outline-none'
          id="w3review" name="w3review" rows="4" cols="50" placeholder='Details' value={disputeDescription}
          onChange={e => setDisputeDescription(e.target.value)}>

</textarea>
    <div className='text-center'>
    <Button  className='' onClick={handleDisputeSubmit} color="primary">Submit Dispute</Button>
    </div>
        </Box>
      </Modal>

         {containsCompany && status==="complete_request"&& completedTasks.length>0 && tasks.length>0 && (
        <Button className='text-center' onClick={handleFinalizeOpen} style={{marginLeft: '0', marginBottom:'6px'}} variant="contained" color="primary">Finalize Project</Button>
        )}
        
    </CompanyLayout>
  )
}


