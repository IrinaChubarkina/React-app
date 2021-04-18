import { React, useEffect, useState } from 'react';
import { Table } from 'antd';
import UserEditor from './UserEditor';

function UserTable() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://localhost:5001/users/list")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  users.forEach(i => i.key = i.id);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'registrationDate',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
    },
    {
      title: 'lastActivityDate',
      dataIndex: 'lastActivityDate',
      key: 'lastActivityDate',
    },
  ];
  
  const onUserSave = user => setUsers([...users, user]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <Table pagination={false} dataSource={users} columns={columns}/>
        <UserEditor onUserSave={onUserSave}></UserEditor>
      </div>
    );
  }
}

export default UserTable;
