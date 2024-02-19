import React, { useRef } from 'react';
import './AttendanceReport.css';
import { useReactToPrint } from 'react-to-print';

const AttendanceReport = ({ data }) => {


  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Attendance Report",
    removeAfterPrint: true,
  });


  const daysInMonth = 31;

  const allColumns = [
    <React.Fragment key="Employee">
      Employee <br /> Number
    </React.Fragment>,
  ];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `2024-01-${String(day).padStart(2, '0')}`;
    allColumns.push(
      <React.Fragment key={day}>
        {`Day ${day}`}
        <br />
        {`${date}`}
      </React.Fragment>
    );
  }

  allColumns.push(
    <React.Fragment key="TotalWorkDays">
      Total Work Days
    </React.Fragment>
  );

  return (
    <>
      <div className='report' ref={contentToPrint}>
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
                    const startTime = inPunch && inPunch.shift ? inPunch.shift.startTime.slice(0, 5) : '';
                    const endTime = outPunch && outPunch.shift ? outPunch.shift.endTime.slice(0, 5) : '';

                    if (inPunch || outPunch) {
                      totalWorkDays += 1;
                    }

                    const hasOnlyInOrOut = (inPunch && !outPunch) || (!inPunch && outPunch);

                    return (
                      <td key={i} className={`days ${hasOnlyInOrOut ? 'missing-both' : ''}`}>
                        <div>
                          {inPunch ? `${inPunch.punchTime.slice(8, 16)}(In)` : ''}
                          {inPunch && startTime ? <div>Start: {startTime}</div> : ''}
                        </div>
                        <div>
                          {outPunch ? `${outPunch.punchTime.slice(8, 16)}(Out)` : ''}
                          {outPunch && endTime ? <div>End: {endTime}</div> : ''}
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
      
      <div style={{ marginLeft: 'auto' }}>
        <button
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
          className="printButton"
        >
          PRINT
        </button>
      </div>
    </>
  );
};

export default AttendanceReport;
