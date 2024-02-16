import React from 'react';
import './AttendanceReport.css';

const AttendanceReport = ({ data }) => {
  const daysInMonth = 31;

  const allColumns = ["Employee Number"];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `2024-01-${String(day).padStart(2, '0')}`;
    allColumns.push(`Day ${day} (${date})`);
  }

  return (
    <div className='report'>
      <h2 className='heading'>Attendance Report</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            {allColumns.map((column, columnIndex) => (
              <th key={columnIndex}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr key={index}>
              <td>{employee.employeeNumber}</td>
              {Array.from({ length: daysInMonth }, (v, i) => {
                const punches = employee.punches.filter(punch => punch.date.endsWith(`-${String(i + 1).padStart(2, '0')}`));
                const inPunch = punches.find(punch => punch.punchType === 'In');
                const outPunch = punches.find(punch => punch.punchType === 'Out');
                return (
                    <td key={i} className='days'>
                    {inPunch && (
                      <div>
                        {`${inPunch.punchTime}(In)`}
                      </div>
                    )}
                    {outPunch && (
                      <div>
                        {`${outPunch.punchTime}(Out)`}
                      </div>
                    )}
                  </td>
                  
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;
