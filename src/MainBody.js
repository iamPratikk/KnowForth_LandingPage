import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { async } from "q";

const MainBody = () => {
  const [subject, setSubject] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [courseID, setCourseID] = useState(0);
  const [subjectID, setSubjectID] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  let subjectPostId = 1;
  const options = [1, 2, 3, 4, 5];
  const username = "csg";
  const password = "csg123";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const subject_URL = "https://orca-app-czm5x.ondigitalocean.app/api/subjects";
  const course_URL = "https://orca-app-czm5x.ondigitalocean.app/api/courses";
  const specific_subject_URL =
    "https://orca-app-czm5x.ondigitalocean.app/api/subjects";
  // const subject_post_URL="https://orca-app-czm5x.ondigitalocean.app/api/subjects"
  // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

  useEffect(() => {
    getSubjects();
  }, []);
  useEffect(() => {
    getCourses();
  }, []);

  async function getSubjects() {
    await axios
      .get(subject_URL, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res);
        setSubjectList(res.data);
      });
  }
  const isSubjectPresent = async () => {
    const response = subjectList.filter((item, index) => {
      if (item.SubjectName === subject && item.CourseID === courseID) {
        return item;
      }
    });
    return response;
  };

  async function getCourses() {
    await axios
      .get(course_URL, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        setCourses(res.data);
        console.log(courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchSubject = async () => {
    try {
      const response = await axios.get(
        "https://orca-app-czm5x.ondigitalocean.app/api/subjects/" + subject,
        {
          auth: {
            username: username,
            password: password,
          },
        }
      );
      console.log("getting subject");
      //   setCourseID(response.data.CourseID)

      setSubjectID(response.data.SubjectID);
      return response.data;
    } catch {
      console.log("getting subject failed");
    }
  };
  const updateSubject = async (subjectData) => {
    try {
      const response = await axios.put(
        "https://orca-app-czm5x.ondigitalocean.app/api/subjects/" +
          subjectData.SubjectID,
        {
          SubjectID: subjectData.SubjectID,
          SubjectName: subjectData.SubjectName,
          CourseID: subjectData.CourseID,
        },
        {
          auth: {
            username: username,
            password: password,
          },
        }
      );
      console.log(response, "update Working");
      return response;
    } catch (err) {
      console.log(err, "update failed");
    }
  };
  const createSubject = async (subjectData) => {
    try {
      console.log(subjectData);
      const response = await axios.post(
        "https://orca-app-czm5x.ondigitalocean.app/api/subjects",
        {
          SubjectID: subjectData.SubjectID,
          SubjectName: subjectData.SubjectName,
          CourseID: subjectData.CourseID,
        },
        {
          auth: {
            username: username,
            password: password,
          },
        }
      );
      console.log(response, "new post generated");
      return response;
    } catch (err) {
      console.log(err, "post failed");
    }
  };

  const successNotification = (text) => {
    Swal.fire({
      icon: "success",
      title: "yay...",
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const errorNotification = (text) => {
    Swal.fire({
      icon: "warning",
      title: "oops...",
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  
  const changeHandler = (e) => {
    setSubject(e.target.value);
  };

  function generatePost(id, subject) {
    const post = {
      SubjectID: id,
      SubjectName: subject,
      CourseID: courseID,
    };
    id++;
    return post;
  }

  const postHandler = async () => {
    try {
      if (!subject) {
        errorNotification("Subject is Empty");
        return;
      }

      const response = await fetchSubject();
      console.log(response);
      if (response && response.CourseID === courseID) {
        await updateSubject({
          SubjectID: response.SubjectID,
          SubjectName: subject,
          CourseID: response.CourseID,
        });
        successNotification("Subject Updated");
      } else if (isSubjectPresent) {
        await updateSubject({
          SubjectID: response.SubjectID,
          SubjectName: subject,
          CourseID: response.CourseID,
        });
        successNotification("Subject Updated");
      } else {
        await createSubject({
          SubjectID: subjectID,
          SubjectName: subject,
          CourseID: courseID,
        });
        console.log("else block creation");
        successNotification("New Subject Created");
      }
    } catch (err) {
      await createSubject({
        SubjectID: subjectID,
        SubjectName: subject,
        CourseID: courseID,
      });
      console.log("catch block creation");
      successNotification("New Subject Created");
    }
  };

  const optionHandler = (e) => {
    console.log(e.target.value);
    setCourseID(courses[e.target.value].CourseID);
  };
  return (
    <div className="border shadow-2xl border-black w-96 h-80 m-5 p-2 ml-44">
      <div className="m-3 p-2">
        <h1 className="text-3xl">Subject</h1>
      </div>
      <div className="m-3 p-2">
        <label>
          Subject Name:
          <input
            value={subject}
            onChange={(e) => changeHandler(e)}
            className="border ml-2"
            name="subjectName"
          />
        </label>
      </div>

      <div className="m-3 p-2 ">
        <label className="flex">
          Course:
          <div className="ml-14">
            <select onChange={(e) => optionHandler(e)}>
              choose
              {courses
                ? courses.map((item, index) => {
                    {
                      /* console.log(item) */
                    }
                    return (
                      <option value={index} className="" key={index}>
                        {item.CourseName}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
        </label>
      </div>
      <div className="m-3 p-2 ml-32 mt-8">
        <button
          onClick={() => postHandler()}
          className="bg-green-700 shadow-lg rounded-lg w-20 h-8 hover:bg-green-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MainBody;

