import React from 'react';
import './Dashboard.css';
import Task from './Components/Task/Task'
import Enguaries from './Components/Enguaries/Enguaries'
import Contents from './Components/Contents/Contents'
import Messages from './Components/Messages/Messages'
import Calendar from 'react-calendar'
import Survey from './Components/Survey/Survey';
import FlexDonutCharts from './Components/Charts/Pie/FlexPieChart';
import BarGraph from './Components/Charts/BarGraph/BarGraph';





const Dashboard = () => {
  return (
    <div className='main-container'>
    <div className='flex-1'>
    <div className='task-container'>
      <Task/>
      </div>
      <div className='calender-container'>
      <Calendar/>
      </div>
      </div>
      <div className='flex-1'>
      <div className='inquiry-container'>
      <Enguaries/>
      </div>
      <div className='survey-container'>
        <Survey/>
      </div>
      </div>
      <div className='flex-1'>
      <div className='contents-container'>
      <Contents/>
      </div>
      <div className='bar-graph'>
        <BarGraph/>
      </div>
      </div>
      <div className='message-container'>
      <Messages/>
      </div>
      <div className='circle-chart'>
        <FlexDonutCharts/>
      </div>
      
      
      
    </div>
  )
}

export default Dashboard