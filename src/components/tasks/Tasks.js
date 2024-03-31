import React,{useState,useEffect} from 'react'

import CompanyLayout from '../CompanyLayout'
import TasksDisplay from './TasksDisplay'; // Import the TasksDisplay component

import {useCookies} from 'react-cookie'
import { toast } from 'react-toastify';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


import { GrAdd } from "react-icons/gr";

import { Typography, Button,Input, Modal, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import DatePicker from 'react-datepicker'; // Import react-datepicker

import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker styles

export default function Tasks() {
  const { id } = useParams();

  const [tasks, settasks] = useState()
  const [cookies, setcookies] = useCookies(['token'])

  const [open, setOpen] = useState(false);
  const [refresh, setrefresh] = useState(true);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [members, setmembers] = useState([])
  const [progress, setprogress] = useState();
  const [showprogress, setshowprogress] = useState(false)
  const [completedTasks, setcompletedTasks] = useState([]);
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

  // Fetch chat messages for the team

  // Call both functions
  const initialize = async () => {
    await fetchTeamDetails();
  };

  initialize();
}, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Call API to create task with assigneeId and projectId
    //console.log('Creating task with assigneeId:', assigneeId, 'and projectId:', projectId);
    console.log('Selected Member ID:', selectedMemberId);
    console.log('Description:', description);
    console.log('Deadline:', deadline);

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
        setSelectedMemberId('')
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
    
    fetch(`http://localhost:3000/api/v1/Freelancer/${id}/getTasks`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        settasks(result.tasks)
        setcompletedTasks(result.tasks.filter((task) => task.status==="submitted"))

        
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
              <div 
              onClick={handleOpen} className="applyAsTeamBtn" style={{display:"flex",alignItems:"center",gap:8,border:"1px solid #2E085A", borderRadius:"8px", padding:"10px", cursor:"pointer"}} >
              <GrAdd size={18} />
              <div>Create Task</div>
              </div>
          </div>
          <div style={{padding:"20px"}}>

          <h3 className='mb-3'>Completed {completedTasks?.length} out of {tasks?.length} tasks</h3>
          
          {showprogress && ( // Render progress bar only when progress is not null
          <ProgressBar variant="success" now={progress} label={`${progress}%`} />
          )}
          </div>
          
          
          
            
          
          <Modal open={open} onClose={handleClose}>
        <div style={{display:'flex',width:'400px',borderRadius:'8px', flexDirection:'column', position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: 20 }}>
          <Typography variant="h6"className='mb-5'>Create Task</Typography>
          <FormControl className='mb-3' style={{ marginBottom: 10 }}>
              <InputLabel>Select Member</InputLabel>
              <Select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
              >
                {members.map(member => (
                  <MenuItem key={member._id} value={member._id}>{member.firstname}</MenuItem>
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
          <Button style={{ marginTop: 10 }} onClick={handleSave} variant="contained" color="primary">Save Changes</Button>
        </div>
          </Modal>

          {/* Render TasksDisplay component with tasks */}
          <TasksDisplay tasks={tasks || []} />
            
        </div>
    </CompanyLayout>
  )
}
