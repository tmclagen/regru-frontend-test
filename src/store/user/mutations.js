import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from './types';

export const getters = {
  users: (state) => state.users,
  usersStatus: (state) => state.usersStatus,
};

export const mutations = {
  [GET_USERS]: (state) => {
    state.usersStatus.type = 'loading';
    state.usersStatus.error = '';
  },
  [GET_USERS_SUCCESS]: (state, payload) => {
    state.usersStatus.type = 'success';
    state.users = payload;
  },
  [GET_USERS_ERROR]: (state, e) => {
    state.usersStatus.type = 'error';
    state.usersStatus.error = e;
  },
};

export const state = {
  users: [],
  usersStatus: {
    type: '',
    error: '',
  },
};
