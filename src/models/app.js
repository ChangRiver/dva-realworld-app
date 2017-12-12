import * as appService from '../services/app';
import { routerRedux } from 'dva/router';
const token = localStorage.getItem('jwt');

export default {
  namespace: 'app',
  state: {
    token: null,
    user: {}
  },
  reducers: {
    save(state, { payload }) {
      return { 
        ...state, 
        ...payload,
        token: payload.user ? payload.user.token : null,
        errors: payload.errors ? payload.errors : null
      }
    },
    appLoad(state, { payload }) {
      return {
        ...state,
        ...payload,
        errors: null
      }
    },
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
        errors: payload.errors ? payload.errors : null
      }
    },
    clearOut(state, { payload }) {
      return {
        token: null,
        user: {}
      }
    }
  },
  effects: {
    *login({ payload: formData }, { call, put }) {
      const { data } = yield call(appService.login, formData);
      yield put({ type: 'save', payload: data })
      if(data.user) {
        const token = data.user.token;
        localStorage.setItem('jwt', token);
        yield put(routerRedux.push('/'))
      }
    },
    *logout({ payload }, { put }) {
      yield put({ type: 'clearOut'})
      localStorage.removeItem('jwt')
      yield put(routerRedux.push('/'))
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
      yield put({ type: 'appLoad', payload: { user: data.user, token } })
    },
    *updateUserInfo({ payload: formData }, { call, put }) {
      const { data } = yield call(appService.updateUserInfo, formData);
      yield put({type: 'update', payload: data})
      if(!data.errors) {
        yield put(routerRedux.push('/'))
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      if(token !== null) {
        dispatch({type: 'getCurrentUser', payload: token})
      }
    }
  }
}