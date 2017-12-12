import * as articleService from '../services/article';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'articleEditor',
  state: {
    tagList: []
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
        errors: payload.errors ? payload.errors : null
      }
    },
    unload(state, { payload }) {
      return {
        tagList: []
      }
    },
    saveTag(state, { payload: tag }) {
      return {
        ...state,
        tagList: state.tagList.concat([tag])
      }
    },
    delTag(state, { payload: tag }) {
      return {
        ...state,
        tagList: state.tagList.filter(item => item !== tag)
      }
    }
  },
  effects: {
    *addTag({ payload: tag }, { put }) {
      yield put({type: 'saveTag', payload: tag})
    },
    *removeTag({ payload: tag }, { put }) {
      yield put({type: 'delTag', payload: tag})
    },
    *pageUnload({ payload }, { put }) {
      yield put({type: 'unload'})
    },
    *articleCreate({ payload: article }, { call, put }) {
      const { data } = yield call(articleService.create, article)
      yield put({type: 'save', payload: data})
      if(!data.errors) {
        const url = `/article/${data.article.slug}`;
        yield put(routerRedux.push(url))
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if(pathname !== '/editor') {
          dispatch({type: 'pageUnload'})
        }
      })
    }
  }
}