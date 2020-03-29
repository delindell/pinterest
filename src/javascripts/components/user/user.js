import userData from '../../helpers/data/userData';

const printUsers = () => {
  userData.getUsers()
    .then((response) => console.error('users got', response.data))
    .catch((err) => console.error('users broke', err));
};

export default { printUsers };
