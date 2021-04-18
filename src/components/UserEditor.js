import { React, useState } from 'react';

function UserEditor({ onUserSave }) {
  const [registrationDate, setRegistrationDate] = useState('');
  const [lastActivityDate, setLastActivityDate] = useState('');

  const onRegistrationDateChange = e => {
    const value = e.target.value;
    setRegistrationDate(value);
  };

  const onLastActivityDateChange = e => {
    const value = e.target.value;
    setLastActivityDate(value);
  };

  const onSave = () => {
    const url = 'https://localhost:5001/users/add';
    const newUser = { id: 0, registrationDate, lastActivityDate };
    
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    };

    fetch(url, requestMetadata)
      .then(res => res.json())
      .then(
        (response) => {
          newUser.id = response;
          setLastActivityDate('');
          setRegistrationDate('');
          onUserSave(newUser);
        },
        (error) => {
          console.log('fail');
        }
      )
  };

  return (
    <div>
      <input value={registrationDate} onChange={onRegistrationDateChange} name='registrationDate'></input>
      <input value={lastActivityDate} onChange={onLastActivityDateChange} name='lastActivityDate'></input>
      <button onClick={onSave}>Save</button>
    </div>
  );
}

export default UserEditor;
