import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import './App.css';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutation/user';

const App = () => {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
  const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  });
  const [newUser] = useMutation(CREATE_USER);

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState(0);

  console.log("🚀 ~ file: App.js ~ line 12 ~ App ~ oneUser", oneUser)

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();

    newUser({
      variables: {
        input: {
          username: userName,
          age: userAge
        }
      }
    }).then(({data}) => {
      console.log(data);
      setUserName('');
      setUserAge(0)
    })

  }

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <form>
        <input type="text"  value={userName} onChange={e => setUserName(e.target.value)}/>
        <input type="number"  value={userAge} onChange={e => setUserAge(+e.target.value)}/>
        <div className='btns'>
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={e => getAll(e)}>Get</button>
        </div>
      </form>
      <div>
        {users.map((user, index) => 
          <div className='user' key={index}>{user.id} {user.username} {user.age}</div>
        )}
      </div>
    </div>
  );
}

export default App;
