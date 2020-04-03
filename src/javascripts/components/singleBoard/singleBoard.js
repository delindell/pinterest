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
      domString += '<button class="btn btn-outline-dark" id="close-single-view"><i class="fas fa-window-close"></i></button>';
      domString += `<div class="container d-flex flex-wrap" id="${selectedBoard.id}">`;
      domString += '<div class="row">';
      pins.forEach((pin) => {
        if (pin.boardId === selectedBoard.id) {
          domString += `<div class="card" id="${pin.id}">`;
          domString += '<div class="col-6">';
          domString += `<img class="img-fluid pin-img" src="${pin.imgUrl}"></img>`;
          domString += '</div>';
          domString += '<button class="btn btn-danger delete-pin-button">DELETE PIN</button>';
          domString += '</div>';
        }
      });
      domString += '<div class="col-3">';
      domString += `<h2 class="board-name">${selectedBoard.name}</h2>`;
      domString += `<p class="board-description">Description:  ${selectedBoard.description}</p>`;
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('board', '');
      utils.printToDom('singleBoardView', domString);
      $('body').on('click', '.delete-pin-button', selectedBoard, removePin);
    });
};

// const viewSingleBoard = (e) => {
//   boardData.getBoards()
//     .then((boards) => {
//       const boardId = e.target.closest('.card').id;
//       const selectedBoard = boards.find((currentBoard) => boardId === currentBoard.id);
//       pinData.getPins().then((pins) => {
//         const pinId = e.target.closest('.card').id;
//         const selectedPin = pins.find((currentPin) => pinId === currentPin.id);
//         singleBoardBuilder(selectedBoard, selectedPin);
//       })
//         .catch((err) => console.error('messed up', err));
//     });
// };

const viewSingleBoard = (e) => {
  boardData.getBoards()
    .then((boards) => {
      const boardId = e.target.closest('.card').id;
      const selectedBoard = boards.find((currentBoard) => boardId === currentBoard.id);
      singleBoardBuilder(selectedBoard);
    })
    .catch((err) => console.error('messed up', err));
};

export default { singleBoardBuilder, removePin, viewSingleBoard };
