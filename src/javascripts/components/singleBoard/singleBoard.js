import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  const boardId = e.data;
  pinData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      singleBoardBuilder(boardId);
    })
    .catch((err) => console.error('could not delete pin', err));
};

const singleBoardBuilder = (selectedBoard) => {
  pinData.getPins(selectedBoard)
    .then((pins) => {
      let domString = '';
      domString += '<div class="selected-board-header">';
      domString += `<h2 class="board-name">${selectedBoard.name}</h2>`;
      domString += '<button class="btn btn-outline-dark" id="close-single-view"><i class="fas fa-window-close"></i></button>';
      domString += '</div>';
      domString += `<div class="container d-flex justify-content-center" id="${selectedBoard.id}">`;
      domString += '<div class="row">';
      pins.forEach((pin) => {
        if (pin.boardId === selectedBoard.id) {
          domString += `<div class="card board-pins" id="${pin.id}">`;
          domString += '<div class="col-3">';
          domString += `<img class="img-fluid pin-img" src="${pin.imgUrl}"></img>`;
          domString += '</div>';
          domString += '<button class="btn btn-danger delete-pin-button">DELETE PIN</button>';
          domString += '</div>';
        }
      });
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('board', '');
      utils.printToDom('singleBoardView', domString);
      $('.delete-pin-button').click(selectedBoard, removePin);
    });
};

const viewSingleBoard = (e) => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoardsByUid(myUid)
    .then((boards) => {
      const boardId = e.target.closest('.card').id;
      const selectedBoard = boards.find((currentBoard) => boardId === currentBoard.id);
      singleBoardBuilder(selectedBoard);
    })
    .catch((err) => console.error('messed up', err));
};

export default { singleBoardBuilder, removePin, viewSingleBoard };
