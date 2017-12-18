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
      const { data } = yield call(articleService.create, article);
      yield put({type: 'save', payload: data});
      if(!data.errors) {
        const url = `/article/${data.article.slug}`;
        yield put(routerRedux.push(url))
      }
    },
    *articleUpdateLoad({ payload }, { put, take, select }) {
      yield take('articleDetail/getDetail/@@end');
      const article = yield select(state => state.articleDetail.article);
      yield put({type: 'save', payload: article})
    },
    *articleUpdate({ payload: article }, { put, call }) {
      const { data } = yield call(articleService.update, article);
      if(!data.errors) {
        const url = `/article/${data.article.slug}`;
        yield put(routerRedux.push(url))
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        const reg = /\/editor/;
        if(!reg.test(pathname)) {
          dispatch({type: 'pageUnload'})
        }
      })
    }
  }
}
