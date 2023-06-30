import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import MainBody from './MainBody'
import axios from 'axios';
import GetSpecificSubject from './GetSpecificSubject';
import { Outlet } from 'react-router';



const Body = () => {
    const [toggleSidebar,setToggleSidebar]=useState(true);
  return (
    <div className='flex' >
        <div>
           {toggleSidebar?<SideBar />:null} 
           <button className='bg-teal-600 w-16 m-5  h-8' onClick={()=>setToggleSidebar(!toggleSidebar)} >collapse</button>
        </div>
        <div>
            <Outlet />
        </div>
        
    </div>
  )
}

export default Body