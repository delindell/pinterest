import pinData from '../../helpers/data/pinData';

const printPins = () => {
  pinData.getPins()
    .then((response) => console.error('pins got', response.data))
    .catch((err) => console.error('pins broke', err));
};

export default { printPins };
