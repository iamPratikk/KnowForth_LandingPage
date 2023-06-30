import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from './SideBar';
import { RouterProvider } from 'react-router-dom';
import MainBody from './MainBody';
import Body from './Body';
import Rooms from './Rooms';
import Courses from './Courses';
import Topic from './Topic';
import Error from './Error';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appRouter= createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement:<Error />,
    children:[{
      path:'/',
      element:<Body />,
      children:[{
        path:'/',
        element:<MainBody />
        
      },{
        path:'/rooms',
        element:<Rooms />
      },{
        path:'/courses',
        element:<Courses />
      },{
        path:'/topic',
        element:<Topic />
      },{
        path:'/subjects',
        element:<MainBody />
      }
    ]
    }]
  }
])

root.render(
  <React.StrictMode>
  <RouterProvider router={appRouter} />

  
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
