import axios from 'axios';
import React from 'react'

const GetCourses = () => {

    const[courses,setCourses]= useState([]);
    axios.get(course_URL,{
        auth:{
            username:username,
            password:password
          }
    }).then((res)=>{
       
        setCourses(res.data);
        // console.log(courses)
    }).catch((err)=>{
        console.log(err)
    })

    return courses;
}

export default GetCourses