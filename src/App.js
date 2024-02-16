import React from 'react';
import AttendanceReport from './AttendanceReport';
import attendanceData from './attendanceData';

const App = () => {

  return (
    <div>
      <AttendanceReport data={attendanceData} />
    </div>
  );
};

export default App;
