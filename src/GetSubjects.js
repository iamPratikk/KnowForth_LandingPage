import axios from 'axios';
import React,{useState} from 'react'

const GetSubjects = () => {

    const [subjectList,setSubjectList]= useState([]);
    axios.get("https://orca-app-czm5x.ondigitalocean.app/api/subjects",{
        auth:{
          username:"csg",
          password:"csg123"
        }
      })
      .then((response)=>{
          console.log(response)
          setSubjectList(response.data);
        //   console.log(subjectList)
      })
      .catch((err)=>{
          console.log(err)
      })

      return subjectList;
}

export default GetSubjects