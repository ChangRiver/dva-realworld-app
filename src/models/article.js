import * as articleService from '../services/article';
const token = localStorage.getItem('jwt');

export default {
  namespace: 'article',
  state: {
    articles: [],
    tags: [],
    articlesCount: null,
    current: 1,
    tabActive: null,
    tag: null
  },
  reducers: {
    saveArticle(state, { payload: { data, page: current, tabActive } }) {
      return { ...state, ...data, current, tabActive, tag: null }
    },
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *articlesAll({ payload: { page, tabActive } }, { call, put }) {
      const { data } = yield call(articleService.all, page - 1)
      console.log('article page ', page)
      console.log('article data ', data)
      yield put({type: 'saveArticle', payload: { data, page, tabActive }})
    },
    *getTags({ payload }, { call, put }) {
      const { data } = yield call(articleService.getTags)
      console.log('tags ', data);
      yield put({type: 'save', payload: data})
    },
    *articlesFeed({ payload: { page, tabActive } }, { call, put }) {
      const { data } = yield call(articleService.feed, page - 1)
      yield put({type: 'saveArticle', payload: { data, page, tabActive }})
    },
    *articlesByTag({ payload: { page, tag } }, { call, put }) {
      const { data } = yield call(articleService.byTag, tag, page - 1)
      yield put({
        type: 'save', 
        payload: { 
          tag, 
          current: page, 
          tabActive: tag,
          articles: data.articles,
          articlesCount: data.articlesCount
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if(pathname === '/') {
          if(token !== null) {
            dispatch({type: 'articlesFeed', payload: { page: 1, tabActive: 'yourFeed' }})
          } else {
            dispatch({type: 'articlesAll', payload: { page: 1, tabActive: 'globalFeed' }})
          }
          dispatch({type: 'getTags'})
        }
      })
    }
  }
}