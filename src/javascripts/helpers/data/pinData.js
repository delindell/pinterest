import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((pinId) => {
        demPins[pinId].id = pinId;
        pins.push(demPins[pinId]);
      });
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newestPin) => axios.post(`${baseUrl}/pins.json`, newestPin);

const updatePinLocation = (pinId, newBoard) => axios.patch(`${baseUrl}/pins/${pinId}.json`, { boardId: newBoard });

export default {
  getPins,
  deletePin,
  addPin,
  updatePinLocation,
};
