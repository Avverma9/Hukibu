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





function App() {


  return (
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
     
    </Routes>
  )
}

export default App
