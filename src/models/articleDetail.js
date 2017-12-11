import * as articleService from '../services/article';
import * as commentService from '../services/comment';

export default {
  namespace: 'articleDetail',
  state: {
    article: {},
    comments: []
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    addComment(state, { payload }) {
      return {
        ...state,
        commentErrors: payload.error ? payload.error : null,
        comments: payload.error ? state.comment : state.comments.concat([payload.comment])
      }
    }
  },
  effects: {
    *getDetail({ payload: slug }, { call, put }) {
      const { data } = yield call(articleService.articleDetail, slug);
      yield put({type: 'save', payload: data})
    },
    *getComments({ payload: slug }, { call, put }) {
      const { data } = yield call(articleService.articleComments, slug);
      yield put({type: 'save', payload: data})
    },
    *createComment({ payload: { slug, comment } }, { call, put }) {
      const { data } = yield call(commentService.create, slug, comment);
      console.log('comment add ', data)
      yield put({type: 'addComment', payload: data})
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        const reg = /\/article\/(.*)/;
        if(pathname.match(reg)) {
          const slug = pathname.match(reg)[1];
          if(slug.length) {
            dispatch({type: 'getDetail', payload: slug})
            dispatch({type: 'getComments', payload: slug})
          }
        }
      })
    }
  }
}