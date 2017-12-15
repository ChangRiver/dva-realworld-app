import * as profileService from '../services/profile';

export default {
  namespace: 'profile',
  state: {
    profile: {}
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *get({ payload: { username } }, { call, put }) {
      const { data } = yield call(profileService.get, username);
      yield put({type: 'save', payload: data})
    },
    *follow({ payload: {username} }, { call, put }) {
      const { data } = yield call(profileService.follow, username);
      yield put({type: 'save', payload: data})
    },
    *unfollow({ payload: {username} }, { call, put }) {
      const { data } = yield call(profileService.unfollow, username);
      yield put({type: 'save', payload: data})
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        const reg = /\/profile@(.+)/;
        if(reg.test(pathname)) {
          const username = reg.exec(pathname)[1];
          dispatch({
            type: 'get',
            payload: { username }
          })
        }
      }) 
    }
  }
}