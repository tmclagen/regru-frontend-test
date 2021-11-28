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

export const getters = {
  issue: (state) => state.issue,
  issueStatus: (state) => state.issueStatus,
  issues: (state, getters, rootState, rootGetters) => {
    const issues = JSON.parse(JSON.stringify(state.issues));

    issues.forEach(issue => {
      issue.status = {...state.issuesStatuses.find(status => status.id === issue.status)};
      issue.responsible = {...rootGetters.users.find(user => user.name === issue.responsible)}
    });

    return issues;
  },
  issuesStatus: (state) => state.issuesStatus,
  issuesStatuses: (state) => state.issuesStatuses,
  issuesStatusesStatus: (state) => state.issuesStatusesStatus,
};

export const mutations = {
  [GET_ISSUE]: (state) => {
    state.issueStatus.type = 'loading';
    state.issuesStatus.error = '';
  },
  [GET_ISSUE_SUCCESS]: (state, payload) => {
    state.issueStatus.type = 'success';
    state.issue = payload;
  },
  [GET_ISSUE_ERROR]: (state, e) => {
    state.issueStatus.type = 'error';
    state.issueStatus.error = e;
  },
  [GET_ISSUES]: (state) => {
    state.issuesStatus.type = 'loading';
    state.issuesStatus.error = '';
  },
  [GET_ISSUES_SUCCESS]: (state, payload) => {
    state.issuesStatus.type = 'success';
    state.issues = payload;
  },
  [GET_ISSUES_ERROR]: (state, e) => {
    state.issuesStatus.type = 'error';
    state.issuesStatus.error = e;
  },
  [GET_ISSUES_STATUSES]: (state) => {
    state.issuesStatusesStatus.type = 'loading';
    state.issuesStatusesStatus.error = '';
  },
  [GET_ISSUES_STATUSES_SUCCESS]: (state, payload) => {
    state.issuesStatusesStatus.type = 'success';
    state.issuesStatuses = payload;
  },
  [GET_ISSUES_STATUSES_ERROR]: (state, e) => {
    state.issuesStatusesStatus.type = 'error';
    state.issuesStatusesStatus.error = e;
  },
};

export const state = {
  issue: {},
  issueStatus: {
    type: '',
    error: '',
  },
  issues: [],
  issuesStatus: {
    type: '',
    error: '',
  },
  issuesStatuses: [],
  issuesStatusesStatus: {
    type: '',
    error: '',
  },
};
