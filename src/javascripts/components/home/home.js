import utils from '../../helpers/utils';

const homeScreen = () => {
  const domString = '<h1>Pinterest</h1>';
  utils.printToDom('home', domString);
};

export default { homeScreen };
