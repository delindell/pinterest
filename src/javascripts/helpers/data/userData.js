import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => axios.get(`${baseUrl}/users.json`);

export default { getUsers };
