import React from 'react';
import './AttendanceReport.css';

const AttendanceReport = ({ data }) => {
  const daysInMonth = 31;

  const allColumns = ["Employee Number"];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `2024-01-${String(day).padStart(2, '0')}`;
    allColumns.push(`Day ${day} (${date})`);
  }

  allColumns.push("Total Work Days");

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
          {data.map((employee, index) => {
            let totalWorkDays = 0;

            return (
              <tr key={index}>
                <td>{employee.employeeNumber}</td>
                {Array.from({ length: daysInMonth }, (v, i) => {
                  const punches = employee.punches.filter(punch => punch.date.endsWith(`-${String(i + 1).padStart(2, '0')}`));
                  const inPunch = punches.find(punch => punch.punchType === 'In');
                  const outPunch = punches.find(punch => punch.punchType === 'Out');
                  const startTime = inPunch && inPunch.shift ? inPunch.shift.startTime : '';
                  const endTime = outPunch && outPunch.shift ? outPunch.shift.endTime : '';

                  if (inPunch || outPunch) {
                    totalWorkDays += 1;
                  }

                  const hasOnlyInOrOut = (inPunch && !outPunch) || (!inPunch && outPunch);

                  return (
                    <td key={i} className={`days ${hasOnlyInOrOut ? 'missing-both' : ''}`}>
                      <div>
                        {inPunch ? `${inPunch.punchTime}(In) | ${startTime ? `Start: ${startTime}` : ''}` : ''}
                      </div>
                      <div>
                        {outPunch ? `${outPunch.punchTime}(Out) | ${endTime ? `End: ${endTime}` : ''}` : ''}
                      </div>
                    </td>
                  );
                })}
                <td>{totalWorkDays}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;
