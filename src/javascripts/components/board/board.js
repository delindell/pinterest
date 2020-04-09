import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

const newBoardForm = $('#new-board-entry');
const newPinForm = $('#new-pin-entry');


const removeBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.getPins(boardId).then((allPins) => {
        allPins.forEach((pin) => {
          if (boardId === pin.boardId) {
            pinData.deletePin(pin.id);
          }
        });
      });
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not delete board', err));
};

const makeNewBoard = (e) => {
  e.preventDefault();
  const newestBoard = {
    name: $('#board-name-field').val(),
    description: $('#board-description-field').val(),
    uid: firebase.auth().currentUser.uid,
  };
  boardData.addBoard(newestBoard)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoards();
      newBoardForm.addClass('hide');
    })
    .catch((err) => console.error('could not add board', err));
  console.log(newestBoard);
};

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<h1 class="text-center all-boards-title">Boards</h1>';
      domString += '<form id="new-board-entry">';
      domString += '<h2>Make a New Board</h2>';
      domString += '<div class="form-group new-board-form col-md-6 d-flex justify-content-around">';
      domString += '<input type="text" class="form-control" id="board-name-field" aria-describedby="boardName" placeholder="Enter Type of Board">';
      domString += '<input type="text" class="form-control" id="board-description-field" placeholder="Enter Board Description">';
      domString += '</div>';
      domString += '<button type="submit" class="btn btn-primary" id="new-board-submit-button">Submit</button>';
      domString += '</form>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += '<div class="col-3" id="all-boards">';
        domString += `<div class="card" id="${board.id}" data-uid="${board.uid}">`;
        domString += `<div class="card-header" id="board-name">${board.name}</div>`;
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title" id="board-description">${board.description}</h5>`;
        domString += '<button class="btn btn-outline-danger delete-board"><i class="fas fa-trash"></i></button>';
        domString += '<button class="btn btn-outline-primary single-board"><i class="fas fa-eye"></i></button>';
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      // newBoardForm.removeClass('hide');
      newPinForm.addClass('hide');
      // newBoardButton.removeClass('hide');
      utils.printToDom('board', domString);
      utils.printToDom('singleBoardView', '');
      $('.delete-board').click(removeBoard);
      $('#new-board-submit-button').click(makeNewBoard);
    })
    .catch((err) => console.error('board broke', err));
};

export default { buildBoards, makeNewBoard };
