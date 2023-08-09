import PieChartComp from "./PieChart";
import './PieChart.css';


const FlexDonutCharts = () => {
    const data1 = [
      { name: 'Girls', students: 400 },
      { name: 'Boys', students: 700 },
    ];
  
    const data2 = [
      { name: 'Category A', students: 300 },
      { name: 'Category B', students: 500 },
    ];
  
    const data3 = [
      { name: 'Red', students: 200 },
      { name: 'Blue', students: 400 },
    ];
  
    const data4 = [
      { name: 'Option 1', students: 700 },
      { name: 'Option 2', students: 100 },
    ];
  
    const colors = ['#FF5F5F', '#49B3FF'];
  
    return (
        <>
        <div className="chart">
          <h2>Student Admission Rate</h2>
        </div>
      <div className="pie-chart" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <PieChartComp data={data1} innerRadius={60} outerRadius={100} colors={colors} />
        <PieChartComp data={data2} innerRadius={60} outerRadius={100} colors={colors} />
        <PieChartComp data={data3} innerRadius={60} outerRadius={100} colors={colors} />
        <PieChartComp data={data4} innerRadius={60} outerRadius={100} colors={colors} />
      </div>
      </>
    );
  };

export default FlexDonutCharts;
