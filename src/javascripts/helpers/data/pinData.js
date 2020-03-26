import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = () => axios.get(`${baseUrl}/pins.json`);

export default { getPins };
