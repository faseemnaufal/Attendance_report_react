import React from 'react';
import './AttendanceReport.css';

const AttendanceReport = ({ data }) => {
  return (
    <div className='report'>
      <h2 className='heading'>Attendance Report</h2>
      {data.map((employee, index) => (
        <div key={index}>
          <h3>Employee {employee.employeeNumber}</h3>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Punch Time</th>
                <th>Punch Type</th>
                <th>ID</th>
                <th>Shift Start Time</th>
                <th>Shift End Time</th>
              </tr>
            </thead>
            <tbody>
              {employee.punches.map((punch, punchIndex) => (
                <tr key={punchIndex}>
                  <td>{punch.date}</td>
                  <td>{punch.punchTime}</td>
                  <td>{punch.punchType}</td>
                  <td>{punch.shift.id}</td>
                  <td>{punch.shift.startTime}</td>
                  <td>{punch.shift.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AttendanceReport;
