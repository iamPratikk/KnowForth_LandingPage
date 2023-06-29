import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';


const MainBody = () => {
    const [subject,setSubject]= useState("");
    const [subjectList,setSubjectList]= useState([]);
    const[courses,setCourses]= useState([]);
    const [course,setCourse]=useState('');
    const [courseID,setCourseID]=useState(0);
    const [subjectID,setSubjectID]= useState(0);
    let isSubjectPresent=false;
    const[courseIndex,setCourseIndex]= useState(0)

    let subjectPostId=1;
    // console.log(subject)
    const options=[1,2,3,4,5];
    const username='csg';
    const password='csg123';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; 
    const subject_URL="https://orca-app-czm5x.ondigitalocean.app/api/subjects";
    const course_URL="https://orca-app-czm5x.ondigitalocean.app/api/courses";
    const specific_subject_URL="https://orca-app-czm5x.ondigitalocean.app/api/subjects";
    // const subject_post_URL="https://orca-app-czm5x.ondigitalocean.app/api/subjects"
    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')


    // useEffect(()=>{
    //     getSubjects();
    // },[]);
    useEffect(()=>{
        getCourses();
    },[])
    
    async function getCourses(){
        axios.get(course_URL,{
            auth:{
                username:username,
                password:password
              }
        }).then((res)=>{
           
            setCourses(res.data);
            console.log(courses)
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function getSubjects(){
        axios.get(subject_URL,{
          auth:{
            username:username,
            password:password
          }
        })
        .then((response)=>{
            // console.log(response)
            setSubjectList(response.data);
            console.log(subjectList)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    async function getSpecificSubject(){
        axios.get('https://orca-app-czm5x.ondigitalocean.app/api/subjects/'+subject,{
            auth:{
                username:'csg',
                password:'csg123'
            }
        }).then((res)=>{
            console.log(res,"getting subject")
            setCourseID(res.data.CourseID)
            isSubjectPresent=true;
            setSubjectID(res.data.SubjectID)
        }).catch((err)=>{
            console.log(err)
            isSubjectPresent=false;
        })
    }
    const changeHandler=(e)=>{
        setSubject(e.target.value)
    }

    function generatePost(id,subject){
        const post={
            'SubjectID':id,
            'SubjectName':subject,
            'CourseID':courseID
        }
        id++;
        return post;
    }

    const postHandler=()=>{
        if(!subject){
            Swal.fire({
                icon:'warning',
                title:'oops..',
                text:"Subject is empty",
                showConfirmButton:false,
                timer:1500
            })
            
        }else{

        
        axios.get('https://orca-app-czm5x.ondigitalocean.app/api/subjects/'+subject,{
            auth:{
                username:'csg',
                password:'csg123'
            }
        }).then((res)=>{
            console.log(res,"getting subject")
            setCourseID(res.data.CourseID)
            isSubjectPresent=true;
            setSubjectID(res.data.SubjectID)
            if(res.data.CourseID==courseID){
                axios.put('https://orca-app-czm5x.ondigitalocean.app/api/subjects/'+res.data.SubjectID,{
                
                "SubjectID":res.data.SubjectID,
                "SubjectName":subject,
                "CourseID":res.data.CourseID
            },{
                auth:{
                    username:'csg',
                    password:'csg123'
                }
            }).then((res)=>{
                console.log(res,"UPDATE working")
            }).catch((err)=>{
                console.log(err,"UPDATE failed")
            })
            Swal.fire({
                icon:'success',
                title:'yay...',
                text:"Subject Updated",
                showConfirmButton:false,
                timer:1500

            })
            }else{
                axios.post('https://orca-app-czm5x.ondigitalocean.app/api/subjects',{
                    'SubjectID':subjectID,
                    'SubjectName':subject,
                    'CourseID':courseID
                },{
                    auth:{
                        username:'csg',
                        password:'csg123'
                    }
                }).then((res)=>{
                    console.log(res)

                }).catch((err)=>{
                    console.log(err)
                })
                Swal.fire({
                    icon:'success',
                    title:'yay...',
                    text:"New Subject Created",
                    showConfirmButton:false,
                    timer:1500
    
                })
            }
            
        }).catch((err)=>{
            console.log(err, 'Getting Subject failed')
            axios.post('https://orca-app-czm5x.ondigitalocean.app/api/subjects',{
                'SubjectID':subjectID,
                'SubjectName':subject,
                'CourseID':courseID
            },{
                auth:{
                    username:'csg',
                    password:'csg123'
                }
            }).then((res)=>{
                console.log(res,'new post generated')

            }).catch((err)=>{
                console.log(err)
            })
            Swal.fire({
                icon:'success',
                title:'yay...',
                text:"New Subject created",
                showConfirmButton:false,
                timer:1500

            })
            
        })
        
       
    }
    }
    // console.log(course)
    const optionHandler=(e)=>{
        console.log(e.target.value)
        setCourseIndex(e.target.value);
        setCourseID(courses[courseIndex].CourseID)
        // console.log(courses[courseIndex].CourseID)

        // courses.find((item)=>{
        //     if(item.CourseName==e.target.value){
        //         setCourseID(item.CourseID);
        //         console.log("ID updated")
        //     }
        // })
    }
  return (
    <div className='border shadow-2xl border-black w-96 h-80 m-5 p-2 ml-44' >
        <div className='m-3 p-2' >
            <h1 className='text-3xl'  >Subject</h1>
        </div>
        <div className='m-3 p-2' >
            <label>Subject Name:
            <input value={subject} onChange={(e)=>changeHandler(e)} className='border ml-2' name='subjectName'  />
            </label>
            
        </div>
        
        <div className='m-3 p-2 ' >
            <label className='flex' >Course:
            <div className='ml-14' >
        <select onChange={(e)=>optionHandler(e)} >choose
            
        {courses?courses.map((item,index)=>{
            {/* console.log(item) */}
            return <option value={index} className='' key={index} >{item.CourseName}</option>
        }):null}
        </select>
        </div>
            </label>
            {/* <input value={course} className='border ml-14' /> */}
            
        </div>
        
        
        
        
        <div className='m-3 p-2 ml-32 mt-8' >
            <button onClick={()=>postHandler()} className='bg-green-700 shadow-lg rounded-lg w-20 h-8 hover:bg-green-500' >Save</button>
        </div>
        
        
       
    </div>
  )
}

export default MainBody

