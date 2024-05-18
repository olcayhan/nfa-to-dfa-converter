import React from "react";

const TransitionTable = ({ table }: any) => {
  return (
    <div className="overflow-x-auto w-full border-[2px] border-blue-300">
      <table
        border={1}
        cellPadding="5"
        style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Current State</th>
            <th>Input Symbol</th>
            <th>Next State</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, index) => (
            <tr key={index}>
              <td>{row.currentState}</td>
              <td>{row.symbol}</td>
              <td>{row.nextState}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransitionTable;
