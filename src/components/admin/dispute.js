import React from 'react'
import { Link } from 'react-router-dom';
export default function Dispute({disputes}) {
  return (
    <div>

        {disputes.filter(dispute => dispute.count > 1 && dispute.status==="active").length ? (
            
        <div className='grid grid-cols-3 gap-3'>
            {disputes.filter(dispute => dispute.count > 1 && dispute.status==="active").map((dispute,index)=>(
    
            <div key={index} className=' border p-3 flex-grow-1 rounded-lg '>
                <div>
                    <h2>Project Title: {dispute?.project?.title}</h2>
                </div>
                <p>Description: {dispute?.description}</p>
                <div className='flex gap-2'>
                    <Link
                        to={`/admin/company/checkProgress/tasks/${dispute.project._id}`}
                        className="text-white border bg-[#6319b885] p-1 rounded-md "
                        >
                            Resolve Dispute
                    </Link>
                    
                </div>
    
            </div>
            ))}
    
        </div>
        ):(
            <h1>No Active Disputes</h1>
        )}
    </div>
  )
}
