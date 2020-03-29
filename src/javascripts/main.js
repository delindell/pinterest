import 'bootstrap';
import '../styles/main.scss';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import myNavbar from './components/myNavbar/myNavbar';
import home from './components/home/home';
import board from './components/board/board';
import singleBoard from './components/singleBoard/singleBoard';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  myNavbar.logoutEvent();
  authData.checkLoginStatus();
  home.homeScreen();
  $('body').on('click', '#close-single-view', board.buildBoards);
  $('body').on('click', '.delete-pin-button', singleBoard.removePin, singleBoard.singleBoardBuilder);
};

init();
