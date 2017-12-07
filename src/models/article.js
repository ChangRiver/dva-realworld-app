import * as articleService from '../services/article';

export default {
  namespace: 'article',
  state: {
    articles: [],
    tags: [],
    articlesCount: null,
    currnent: 1
  },
  reducers: {
    saveArticle(state, { payload: { data, page: current } }) {
      return { ...state, ...data, current }
    },
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *articlesAll({ payload: page }, { call, put }) {
      const { data } = yield call(articleService.all, page - 1)
      console.log('article page ', page)
      console.log('article data ', data)
      yield put({type: 'saveArticle', payload: { data, page }})
    },
    *getTags({ payload }, { call, put }) {
      const { data } = yield call(articleService.getTags)
      console.log('tags ', data);
      yield put({type: 'save', payload: data})
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if(pathname === '/') {
          dispatch({type: 'articlesAll', payload: 1})
          dispatch({type: 'getTags'})
        }
      })
    }
  }
}