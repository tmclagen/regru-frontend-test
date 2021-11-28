import axios from 'axios';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from './types';

const getUsers = async ({ commit }) => {
  commit(GET_USERS);
  try {
    const { data } = await axios.get('user');
    commit(GET_USERS_SUCCESS, data);
    return Promise.resolve();
  } catch (e) {
    commit(GET_USERS_ERROR, e);
    return Promise.reject();
  }
};

export default {
  [GET_USERS]: getUsers,
};
