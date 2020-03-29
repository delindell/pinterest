import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((boardId) => {
        demBoards[boardId].id = boardId;
        boards.push(demBoards[boardId]);
      });
      resolve(boards);
    })
    .catch((err) => reject(err));
});


const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export default { getBoards, deleteBoard };
