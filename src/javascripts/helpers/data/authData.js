import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const homeDiv = $('#home');
const boardDiv = $('#board');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person logged in
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardDiv.removeClass('hide');
      logoutButton.removeClass('hide');
    } else {
      // person not logged in
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
