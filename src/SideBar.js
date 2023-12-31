import React from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {
    const list=["Rooms","Courses","Subjects","topic","Department","Designation","Employee","Student"];

  return (
    <div className=' m-5 p-2 w-72 ' >

    {list.map((item,index)=>{
        return (
            <div key={index} >
            <ul key={index} >
           
           <Link to={`/${item}`} ><li key={index} className='border border-gray-400 p-2 hover:bg-red-200' >{item}</li></Link>

        </ul>
            </div>
        )

    })}
    
        
    </div>
  )
}

export default SideBar