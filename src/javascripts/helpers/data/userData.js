import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const demUsers = response.data;
      const users = [];
      Object.keys(demUsers).forEach((userId) => {
        demUsers[userId].id = userId;
        users.push(demUsers[userId]);
      });
      resolve(users);
      console.log('users array', users);
    })
    .catch((err) => reject(err));
});


export default { getUsers };
