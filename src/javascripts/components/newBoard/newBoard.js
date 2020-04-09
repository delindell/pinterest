import firebase from 'firebase/app';
import 'firebase/auth';

const makeNewBoard = (e) => {
  e.preventDefault();
  console.log(e);
  const newestBoard = {
    name: $('#board-name-field').val(),
    description: $('#board-description-field').val(),
    uid: firebase.auth().currentUser.uid,
  };
  console.log(newestBoard);
};

export default { makeNewBoard };
