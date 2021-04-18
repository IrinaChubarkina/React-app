import { React, useState } from 'react';

function Statistics() {
  const [rollingRetention, setRollingRetention] = useState(null);

  const calculate = e => {
    fetch("https://localhost:5001/users/calculate")
      .then(res => res.json())
      .then(
        (result) => {
          setRollingRetention(result.rollingRetention);
          console.log(result, 'result');
        },
        (error) => {
        }
      );
  };

  return (
    <div>
      <button onClick={calculate}>Calculate</button>
      <div>RollingRetention = {rollingRetention}</div>
    </div>
  );
}

export default Statistics;