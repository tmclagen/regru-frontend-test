import axios from 'axios';
import {
  GET_ISSUE,
  GET_ISSUE_SUCCESS,
  GET_ISSUE_ERROR,
  GET_ISSUES,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_ERROR,
  GET_ISSUES_STATUSES,
  GET_ISSUES_STATUSES_SUCCESS,
  GET_ISSUES_STATUSES_ERROR,
} from './types';

const getIssue = async ({ commit }, issueId) => {
  commit(GET_ISSUE);
  try {
    const { data } = await axios.get(`issue/${issueId}`);
    commit(GET_ISSUE_SUCCESS, data);
    return Promise.resolve();
  } catch (e) {
    commit(GET_ISSUE_ERROR, e);
    return Promise.reject();
  }
};

const getIssues = async ({ commit }) => {
  commit(GET_ISSUES);
  try {
    const { data } = await axios.get('issue');
    commit(GET_ISSUES_SUCCESS, data);
    return Promise.resolve();
  } catch (e) {
    commit(GET_ISSUES_ERROR, e);
    return Promise.reject();
  }
};

const getIssuesStatuses = async ({ commit }) => {
  commit(GET_ISSUES_STATUSES);
  try {
    const { data } = await axios.get('status');
    commit(GET_ISSUES_STATUSES_SUCCESS, data);
    return Promise.resolve();
  } catch (e) {
    commit(GET_ISSUES_STATUSES_ERROR, e);
    return Promise.reject();
  }
};

export default {
  [GET_ISSUE]: getIssue,
  [GET_ISSUES]: getIssues,
  [GET_ISSUES_STATUSES]: getIssuesStatuses,
};
