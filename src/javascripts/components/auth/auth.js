import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import board from '../board/board';
import pins from '../pins/pins';
import user from '../user/user';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  board.buildBoards();
  pins.printPins();
  user.printUsers();
};

const loginButton = () => {
  const domString = '<button id="google-auth" class="btn btn-danger">Google Login</button>';
  utils.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
