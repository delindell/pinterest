import utils from '../../helpers/utils';

const boardScreen = () => {
  const domString = '<h1>Board</h1>';
  utils.printToDom('board', domString);
};

export default { boardScreen };
