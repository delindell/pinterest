import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

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

const buildBoards = () => {
  boardData.getBoards()
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center">Boards</h2>';
      domString += '<div class="d-flex flew-wrap">';
      boards.forEach((board) => {
        domString += '<div class="col-3">';
        domString += `<div class="card" id="${board.id}">`;
        domString += `<div class="card-header">${board.name}</div>`;
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title">${board.description}</h5>`;
        domString += '<button class="btn btn-danger delete-board"><i class="fas fa-trash"></i></button>';
        domString += '<button class="btn btn-danger single-board"><i class="fas fa-eye"></i></button>';
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
        domString += '</div>';
      });
      utils.printToDom('board', domString);
      utils.printToDom('singleBoardView', '');
      $('.delete-board').click(removeBoard);
    })
    .catch((err) => console.error('board broke', err));
};

export default { buildBoards };
