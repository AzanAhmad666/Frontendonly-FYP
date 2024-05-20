import React, {useState,useEffect} from 'react'
import { GoProjectRoadmap } from "react-icons/go";
import { MdPeopleAlt } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { BiMessageSquareError } from "react-icons/bi";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale,BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function Admin() {
    const [dailyData, setDailyData] = useState({
    blogs: generateDummyData(30),
    likes: generateDummyData(30),
    comments: generateDummyData(30)
  });
  const [monthlyData, setMonthlyData] = useState({
    blogs: generateDummyData(12),
    likes: generateDummyData(12),
    comments: generateDummyData(12)
  });
  const [yearlyData, setYearlyData] = useState({
    blogs: generateDummyData(5),
    likes: generateDummyData(5),
    comments: generateDummyData(5)
  });

  const [selectedDataType, setSelectedDataType] = useState('blogs');
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');


  const getChartData = () => {
      let data=dailyData[selectedDataType];
      if (selectedTimeframe === 'daily') {
        data = dailyData[selectedDataType];
      } else if (selectedTimeframe === 'monthly') {
        data = monthlyData[selectedDataType];
      } else {
        data = yearlyData[selectedDataType];
      }
      return createChartData(data, `${capitalizeFirstLetter(selectedTimeframe)} ${capitalizeFirstLetter(selectedDataType)}`);
    };

    const createChartData = (data, label) => {
      if (!data) {
        return { labels: [], datasets: [] };
      }
  
      return {
        labels: data.map(d => d.date),
        datasets: [
          {
            label: label,
            data: data.map(d => d.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            
          },
        ],
      };
    };

  return (
    <div className="justify-content-center mx-auto">
        <p style={{margin:25,fontSize:30, fontWeight:'bold'}}>Hello Cute Uzair!</p>
        
  <div className="d-flex flex-wrap gap-4 justify-content-center">
    <div className="d-flex p-3 w-100 gap-3 hover:cursor-pointer">
      
      <div className="d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1 hover:cursor-pointer" >
        <div className='d-flex justify-content-center gap-2' >
          <h3 className="" style={{fontWeight:'bolder'}}>Total Projects</h3>
          <GoProjectRoadmap color='#6319b885' size={30} style={{fontWeight:'bold'}}/>
        </div>
          <p className="h4 d-flex justify-content-center"style={{fontWeight:'bolder'}}>0</p>
        
      </div>
      <div className="d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1" >
        <div className='d-flex justify-content-center gap-2' >
          <h3 className="" style={{fontWeight:'bolder'}}>Freelancers</h3>
          <MdPeopleAlt color='#6319b885' size={30} className='' style={{fontWeight:'bolder'}}/>
        </div>
          <p className="h4 d-flex justify-content-center"style={{fontWeight:'bolder'}}>0</p>
        
      </div>
      <div className="d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1" >
        <div className='d-flex justify-content-center  gap-2' >
          <h3 className="" style={{fontWeight:'bolder'}}>Companies</h3>
          <GoOrganization color='#6319b885' size={30} className='' style={{fontWeight:'bolder'}}/>
        </div>
          <p className="h4 d-flex justify-content-center"style={{fontWeight:'bolder'}}>0</p>
        
      </div>
      <div className="d-flex flex-column justify-content-center p-3 rounded shadow flex-grow-1" >
        <div className='d-flex justify-content-center gap-2' >
          <h3 className="" style={{fontWeight:'bolder'}}>Disputes</h3>
          <BiMessageSquareError color='#6319b885' size={30} className='' style={{fontWeight:'bolder'}}/>
        </div>
          <p className="h4 d-flex justify-content-center"style={{fontWeight:'bolder'}}>0</p>
        
      </div>
      
      
      
      
      
      
      
    </div>
    
    
  </div>

  

  <Bar data={getChartData()} />


</div>
  )
}


function generateDummyData(days) {
  const data = [];
  for (let i = 1; i <= days; i++) {
    data.push({
      date: `2024-05-${i < 10 ? '0' : ''}${i}`,
      count: Math.floor(Math.random() * 100)
    });
  }
  return data;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }