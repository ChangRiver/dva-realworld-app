import * as appService from '../services/app';
import { routerRedux } from 'dva/router';
const token = localStorage.getItem('jwt');

export default {
  namespace: 'app',
  state: {
    user: {}
  },
  reducers: {
    save(state, { payload }) {
      return { 
        ...state, 
        ...payload,
        errors: payload.errors ? payload.errors : null
      }
    }
  },
  effects: {
    *login({ payload: formData }, { call, put }) {
      const { data } = yield call(appService.login, formData);
      // console.log('login data ', data)
      yield put({ type: 'save', payload: data })
      if(data.user) {
        const token = data.user.token;
        localStorage.setItem('jwt', token);
        yield put(routerRedux.push('/'))
      }
    },
    *register({ payload: formData }, { call, put }) {
      const { data } = yield call(appService.register, formData);
      yield put({ type: 'save', payload: data })
      if(data.user) {
        const token = data.user.token;
        localStorage.setItem('jwt', token);
        yield put(routerRedux.push('/'))
      }
    },
    *getCurrentUser({ payload:token }, { call, put }) {
      const { data } = yield call(appService.getCurrentUser);
      yield put({ type: 'save', payload: { user: data.user, token } })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if(pathname === '/' && token !== null) {
          dispatch({type: 'getCurrentUser', payload: token})
        }
      })
    }
  }
}