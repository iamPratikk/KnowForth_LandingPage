import React from 'react'

const SideBar = () => {
    const list=["Rooms","Courses","Subjects","topic","Department","Designation","Employee","Student"];

  return (
    <div className=' m-5 p-2 w-72 ' >

    {list.map((item,index)=>{
        return (
            <div key={index} >
            <ul key={index} >
           
            <li key={index} className='border border-gray-400 p-2 hover:bg-red-200' >{item}</li>

        </ul>
            </div>
        )

    })}
    
        
    </div>
  )
}

export default SideBar