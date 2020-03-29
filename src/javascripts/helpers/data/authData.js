import firebase from 'firebase/app';
import 'firebase/auth';
import board from '../../components/board/board';

const authDiv = $('#auth');
const homeDiv = $('#home');
const boardDiv = $('#board');
const logoutButton = $('#navbar-logout-button');

const getCurrentUid = () => {
  const myUid = firebase.auth().currentUser.uid;
  console.log(myUid);
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person logged in
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      board.buildBoards();
    } else {
      // person not logged in
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
    getCurrentUid();
  });
};

export default { checkLoginStatus };
