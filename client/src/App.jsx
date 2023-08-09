import './App.css'
import {Routes, Route} from 'react-router-dom'
import Task from "./Components/Task/Task"
import Enguaries from './Components/Enguaries/Enguaries'
import Contents from './Components/Contents/Contents'
import Messages from './Components/Messages/Messages'
import Calendar from './Components/Calender/Calender'
import Dashboard from './Dashboard'
import Survey from './Components/Survey/Survey'
import BarGraph from './Components/Charts/BarGraph/BarGraph'
import FlexPieCharts from './Components/Charts/Pie/FlexPieChart'
import User from './Components/User/User'
import Header from './Components/Header/Header'
import GetCourses from './Components/Courses/getCourses'
import Activities from './Components/Activities/Activities'
import SingleActivities from './Components/Activities/SingleActivities'
import { Child } from "./Components/Child/Child";





function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
     <Route path='/tasks' element={<Task/>}/>
     <Route path="/enguaries" element={<Enguaries/>}/>
     <Route path='/content' element={<Contents/>}/>
     <Route path='/message' element={<Messages/>}/>
     <Route path="/calender" element={<Calendar/>}/>
     <Route path='/survey' element={<Survey/>}/>
     <Route path='/piechart' element={<FlexPieCharts/>}/>
     <Route path='/bargraph' element={<BarGraph/>}/>
     <Route path='/user' element={<User/>}/>
     <Route path="/child" element={<Child />} />
     <Route path='/get-courses' element={<GetCourses/>}/>
     <Route path='/activities' element={<Activities/>}/>
     <Route path='/activities/:id' element={<SingleActivities/>}/>
     
    </Routes></>
  )
}

export default App;
