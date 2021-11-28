import { createStore } from 'vuex'
import user from './user/';
import issues from './issues/';

export default createStore({
  modules: {
    user,
    issues,
  }
});