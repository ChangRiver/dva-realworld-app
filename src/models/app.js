import * as userService from '../services/app';
import { routerRedux } from 'dva/router';

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
      const { data } = yield call(userService.login, formData);
      // console.log('login data ', data)
      yield put({ type: 'save', payload: data })
      if(data.user) {
        const token = data.user.token;
        localStorage.setItem('jwt', token);
        yield put(routerRedux.push('/'))
      }
    },
    *register({ payload: formData }, { call, put }) {
      const { data } = yield call(userService.register, formData);
      yield put({ type: 'save', payload: data })
      if(data.user) {
        const token = data.user.token;
        localStorage.setItem('jwt', token);
        yield put(routerRedux.push('/'))
      }
    }
  }
}