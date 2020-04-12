import firebase from 'firebase/app';
import 'firebase/auth';
import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

const newBoardForm = $('#new-board-entry');
const newBoardButton = $('#add-new-board-button');

const changePinBoard = (e) => {
  e.preventDefault();
  const newPinId = e.target.dataset.pinId;
  const selectedBoard = e.data;
  if (e.target.checked) {
    const boardId = e.target.closest('.form-check-input').id;
    pinData.updatePinLocation(newPinId, boardId)
      .then(() => {
        const myUid = firebase.auth().currentUser.uid;
        boardData.getBoardsByUid(myUid)
          .then((boards) => {
            // eslint-disable-next-line no-use-before-define
            singleBoardBuilder(selectedBoard, boards);
          });
      })
      .catch((err) => console.error('could not move pin', err));
  }
};

const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  const selectedBoard = e.data;
  pinData.deletePin(pinId)
    .then(() => {
      const myUid = firebase.auth().currentUser.uid;
      boardData.getBoardsByUid(myUid)
        .then((boards) => {
          // eslint-disable-next-line no-use-before-define
          singleBoardBuilder(selectedBoard, boards);
        })
        .catch((err) => console.error('could not delete pin', err));
    });
};

const makeNewPin = (e) => {
  e.preventDefault();
  const selectedBoard = e.data;
  const newestPin = {
    imgUrl: $('#pin-image-link').val(),
    boardId: e.data.id,
  };
  pinData.addPin(newestPin)
    .then(() => {
      const myUid = firebase.auth().currentUser.uid;
      boardData.getBoardsByUid(myUid)
        .then((boards) => {
          // eslint-disable-next-line no-use-before-define
          singleBoardBuilder(selectedBoard, boards);
        })
        .catch((err) => console.error('could not add new pin', err));
    });
};

const singleBoardBuilder = (selectedBoard, boards) => {
  pinData.getPins(selectedBoard)
    .then((pins) => {
      let domString = '';
      domString += '<div class="selected-board-header">';
      domString += `<h2 class="board-name">${selectedBoard.description}</h2>`;
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
          domString += '<form>';
          domString += '<h4>Move Pin</h4>';
          boards.forEach((board) => {
            domString += '<div class="form-check">';
            domString += `<input type="checkbox" class="form-check-input board-change-checkbox" data-pin-id="${pin.id}" data-board-uid="${board.uid}" id="${board.id}">`;
            domString += `<label class="form-check-label" for="exampleCheck1">${board.name}</label>`;
            domString += '</div>';
          });
          domString += '</form>';
        }
      });
      domString += '</div>';
      domString += '</div>';
      domString += '<form id="new-pin-entry">';
      domString += '<h2>Make A New Pin</h2>';
      domString += '<div class="form-group new-pin-form">';
      domString += '<input type="text" class="form-control" id="pin-image-link" placeholder="Enter Pin Image Link">';
      domString += '</div>';
      domString += '<button type="submit" class="btn btn-primary" id="new-pin-submit-button">Submit</button>';
      domString += '</form>';
      newBoardForm.addClass('hide');
      newBoardButton.addClass('hide');
      utils.printToDom('board', '');
      utils.printToDom('singleBoardView', domString);
      $('.delete-pin-button').click(selectedBoard, removePin);
      $('#new-pin-submit-button').click(selectedBoard, makeNewPin);
      $('.board-change-checkbox').click(selectedBoard, changePinBoard);
    });
};

const viewSingleBoard = (e) => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoardsByUid(myUid)
    .then((boards) => {
      const boardId = e.target.closest('.card').id;
      const selectedBoard = boards.find((currentBoard) => boardId === currentBoard.id);
      singleBoardBuilder(selectedBoard, boards);
    })
    .catch((err) => console.error('messed up', err));
};

export default { singleBoardBuilder, removePin, viewSingleBoard };
