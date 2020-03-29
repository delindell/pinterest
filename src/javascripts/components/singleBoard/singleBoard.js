import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  pinData.deletePin(pinId);
  // const selectedBoard =
  // // eslint-disable-next-line no-use-before-define
  // singleBoardBuilder(selectedBoard)
  //   // .then(() => {
  //   //   console.log(response.config.url);
  // })
  // .catch((err) => console.error('could not delete pin', err));
};

const singleBoardBuilder = (selectedBoard) => {
  pinData.getPins()
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
    });
};

export default { singleBoardBuilder, removePin };
