import React, { useState, useEffect } from 'react';
import { GoProjectRoadmap } from 'react-icons/go';
import { MdPeopleAlt } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';
import { BiMessageSquareError } from 'react-icons/bi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Freelancers from './freelancers';
import Dispute from './dispute';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Admin() {
  const [data, setData] = useState({
    requires_confirmation: 0,
    complete_request: 0,
    null: 0,
    disputed: 0,
    completed: 0,
    working: 0,
  });
  const [freelancers, setfreelancers] = useState();
  const [companies, setcompanies] = useState();
  const [disputes, setdisputes] = useState();
  
  useEffect(() => {
    const fetchProjects = () =>{
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
  
      fetch('http://localhost:3000/api/v1/admin/projects/status-count', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success && result.data) {
            setData(result.data);
          }
        })
        .catch((error) => console.error(error));
    };
    const fetchFreelancers = () =>{
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://localhost:3000/api/v1/Freelancer/AllFreelancers", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          if (result.success || result.freelancers || result.companies) {
            setfreelancers(result.freelancers);
            setcompanies(result.companies)
          }

        }
      )
        .catch((error) => console.error(error));
    }
    const fetchDisputes = () =>{
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
  
      fetch('http://localhost:3000/api/v1/dispute/all', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success && result.data) {
            setdisputes(result.data);
          }
        })
        .catch((error) => console.error(error));
    };
    
    fetchProjects()
    fetchFreelancers()
    fetchDisputes()
   
  }, []);

  const [defaultSelection, setDefaultSelection] = useState('projects');

  const labelMapping = {
    requires_confirmation: 'Requires Confirmation',
    complete_request: 'Complete Request',
    //null: 'Not Started',
    disputed: 'Disputed',
    completed: 'Completed',
    working: 'Working',
  };

  const getChartData = () => {
    // Combine the values of "null" and "working"
    const combinedWorkingValue = (data.null || 0) + (data.working || 0);
    
    // Create a new data object excluding the "null" key
    const transformedData = {
      ...data,
      working: combinedWorkingValue,
    };
    delete transformedData.null;

    const labels = Object.keys(transformedData).map((key) => labelMapping[key] || key);
    const values = Object.values(transformedData);

    return {
      labels,
      datasets: [
        {
          label: 'Project Status',
          data: values,
          backgroundColor: '#6319b885',
          borderColor: '#6319b885',
          borderWidth: 1,
          borderRadius: 5,
          hoverBackgroundColor: '#6319b8',
          hoverBorderColor: '#6319b8',

          
        },
      ],
    };
  };

  return (
    <div className="flex flex-col max-w-6xl items-center mx-auto">
      <p className="w-full" style={{ margin: 25, fontSize: 30, fontWeight: 'bold' }}>
        Hello Cute Uzair!
      </p>

      <div className="d-flex flex-wrap w-full gap-4 hover:cursor-pointer mb-8">
        <div
          onClick={() => setDefaultSelection('projects')}
          className={`d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1 hover:cursor-pointer ${
            defaultSelection === 'projects' ? 'bg-[#6319b885] text-white' : ''
          }`}
        >
          <div className="d-flex justify-content-center gap-2">
            <h3 className="" style={{ fontWeight: 'bolder' }}>
              Total Projects
            </h3>
            <GoProjectRoadmap size={30} style={{ fontWeight: 'bold' }} />
          </div>
          <p className="h4 d-flex justify-content-center" style={{ fontWeight: 'bolder' }}>
            {Object.values(data).reduce((a, b) => a + b, 0)}
          </p>
        </div>
        <div
          onClick={() => setDefaultSelection('freelancers')}
          className={`d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1 hover:cursor-pointer ${
            defaultSelection === 'freelancers' ? 'bg-[#6319b885] text-white' : ''
          }`}
        >
          <div className="d-flex justify-content-center gap-2">
            <h3 className="" style={{ fontWeight: 'bolder' }}>
              Freelancers
            </h3>
            <MdPeopleAlt size={30} className="" style={{ fontWeight: 'bolder' }} />
          </div>
          <p className="h4 d-flex justify-content-center" style={{ fontWeight: 'bolder' }}>
            {freelancers?.length}
          </p>
        </div>
        <div
          onClick={() => setDefaultSelection('companies')}
          className={`d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1 hover:cursor-pointer ${
            defaultSelection === 'companies' ? 'bg-[#6319b885] text-white' : ''
          }`}
        >
          <div className="d-flex justify-content-center gap-2">
            <h3 className="" style={{ fontWeight: 'bolder' }}>
              Companies
            </h3>
            <GoOrganization size={30} className="" style={{ fontWeight: 'bolder' }} />
          </div>
          <p className="h4 d-flex justify-content-center" style={{ fontWeight: 'bolder' }}>
            {companies?.length}
          </p>
        </div>
        <div
          onClick={() => setDefaultSelection('disputes')}
          className={`d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1 hover:cursor-pointer ${
            defaultSelection === 'disputes' ? 'bg-[#6319b885] text-white' : ''
          }`}
        >
          <div className="d-flex justify-content-center gap-2">
            <h3 className="" style={{ fontWeight: 'bolder' }}>
              Active Disputes
            </h3>
            <BiMessageSquareError size={30} className="" style={{ fontWeight: 'bolder' }} />
          </div>
          <p className="h4 d-flex justify-content-center" style={{ fontWeight: 'bolder' }}>
            {disputes?.filter(dispute => dispute.count > 1 && dispute.status==="active").length}
          </p>
        </div>
      </div>

      {defaultSelection === 'projects' && <Bar data={getChartData()} />}
      {defaultSelection === 'freelancers' && <Freelancers applicants={freelancers}/>}
      {defaultSelection === 'companies' && <Freelancers applicants={companies}/>}
      {defaultSelection === 'disputes' && <Dispute disputes={disputes}/>}
    </div>
  );
}
