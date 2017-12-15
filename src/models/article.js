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
    saveArticle(state, { payload: { data, page: current } }) {
      return { ...state, ...data, current, tag: null }
    },
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    articleFavorite(state, { payload: { article } }) {
      return {
        ...state,
        articles: state.articles.map(item => {
          if(item.slug === article.slug) {
            return {
              ...article,
              favorited: article.favorited,
              favoritesCount: article.favoritesCount
            }
          }
          return item;
        })
      }
    }
  },
  effects: {
    *articlesAll({ payload: { page } }, { call, put, select }) {
      const { data } = yield call(articleService.all, page - 1)
      yield put({type: 'saveArticle', payload: { data, page }})
    },
    *getTags({ payload }, { call, put }) {
      const { data } = yield call(articleService.getTags)
      yield put({type: 'save', payload: data})
    },
    *articlesFeed({ payload: { page } }, { call, put }) {
      const { data } = yield call(articleService.feed, page - 1)
      yield put({type: 'saveArticle', payload: { data, page }})
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
    },
    *articlesByAuthor({ payload: { author, page } }, { call, put }) {
      const { data } = yield call(articleService.byAuthor, author, page-1)
      yield put({
        type: 'saveArticle',
        payload: {
          data,
          page
        }
      })
    },
    *favoritedArticles({ payload: { author, page } }, { call, put }) {
      const { data } = yield call(articleService.favoritedBy, author, page-1)
      yield put({
        type: 'saveArticle',
        payload: {
          data,
          page
        }
      })
    },
    *favorite({ payload: slug }, { call, put }) {
      const { data } = yield call(articleService.favorite, slug)
      yield put({type: 'articleFavorite', payload: data })
    },
    *unFavorite({ payload: slug }, { call, put }) {
      const { data } = yield call(articleService.unfavorite, slug)
      yield put({type: 'articleFavorite', payload: data })
    },
    *changeTab({ payload: { tabActive } }, { put }) {
      yield put({type: 'save', payload: { tabActive }})
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        const reg = /\/profile@(.+)/;
        if(pathname === '/') {
          const token = localStorage.getItem('jwt');
          if(token !== null) {
            dispatch({type: 'changeTab', payload: { tabActive: 'yourFeed' }})
            dispatch({type: 'articlesFeed', payload: { page: 1 }})
          } else {
            dispatch({type: 'changeTab', payload: { tabActive: 'globalFeed' }})
            dispatch({type: 'articlesAll', payload: { page: 1 }})
          }
          dispatch({type: 'getTags'})
        }
        if(reg.test(pathname)) {
          const author = reg.exec(pathname)[1];
          dispatch({
            type: 'changeTab',
            payload: {
              tabActive: 'myArticles'
            }
          })
          dispatch({
            type: 'articlesByAuthor',
            payload: { 
              page: 1,
              author: author
            }
          })
        }
      })
    }
  }
}