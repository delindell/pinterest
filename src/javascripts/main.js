import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import myNavbar from './components/myNavbar/myNavbar';
import home from './components/home/home';
import board from './components/board/board';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  myNavbar.logoutEvent();
  authData.checkLoginStatus();
  home.homeScreen();
  board.boardScreen();
};

init();
