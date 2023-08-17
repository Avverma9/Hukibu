import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Task from "./Components/Task/Task";
// import Enguaries from "./Components/Enguaries/Enguaries";
import Contents from "./Components/Contents/Contents";
import Messages from "./Components/Messages/Messages";
import Calendar from "./Components/Calender/Calender";
// import Survey from "./Components/Survey/Survey";
import BarGraph from "./Components/Charts/BarGraph/BarGraph";
import FlexPieCharts from "./Components/Charts/Pie/FlexPieChart";
import User from "./Components/User/User";
import Header from "./Components/Header/Header";
import { Child } from "./Components/Child/Child";
import Welcome from "./Components/Welcome/Welcome";

import Activities from "./Components/Activities/Activities";
import SingleActivities from "./Components/Activities/SingleActivities";
import { Instructor } from "./Components/Instructor/Instructor";
import { Steps } from "./Components/Steps/Steps";
import Materials from "./Components/Materials/Materials";
import Courses from "./Components/Courses/Courses";
import AddCourse from "./Components/Courses/AddCourse";
import AddStep from "./Components/Steps/AddSteps";
import AddInstructor from "./Components/Instructor/AddInstructor";

function App() {
  return (
    <>
      <Header />

      <Router>
        <Welcome />
        <AddCourse/>
        <Routes>
         
          {/* <Route path="/enguaries" element={<Enguaries />} /> */}
          <Route path="/content" element={<Contents />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/calender" element={<Calendar />} />
          {/* <Route path="/survey" element={<Survey />} /> */}
          <Route path="/piechart" element={<FlexPieCharts />} />
          <Route path="/bargraph" element={<BarGraph />} />
          <Route path="/user" element={<User />} />
          <Route path="/child" element={<Child />} />
          <Route path="/materials" element={<Materials/>} />
          <Route path="/add-steps" element={<AddStep/>}/>
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<SingleActivities />} />
          <Route path="/all-instructor" element={<Instructor />} />
          <Route path="/add-instructor" element={<AddInstructor/>}/>
          <Route path="/all-steps" element={<Steps />} />
         <Route path="/get-courses" element={<Courses/>}/>
        
        </Routes>
      </Router>
    </>
  );
}

export default App;
