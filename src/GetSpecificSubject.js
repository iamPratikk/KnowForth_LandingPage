import axios from "axios"
import { useState } from "react"


const GetSpecificSubject = () => {
    const [data,setData]=useState({});
    // console.log(subject)
  axios.get("https://orca-app-czm5x.ondigitalocean.app/api/subjects/chemistry",{
    auth:{
        username:"csg",
        password:"csg123"
      }
  }).then((res)=>{
    console.log(res)
    // setData({courseID:res.data.CourseID,subject:res.data.SubjectID,subjectID:res.data.SubjectID})
  }).catch((err)=>{
    console.log(err)
  })

//   return data;


}

export default GetSpecificSubject