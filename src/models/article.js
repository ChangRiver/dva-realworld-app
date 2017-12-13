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
    *articleLoad({ payload: { page } }, { call, put, select }) {
      const token = yield select(state => state.app.token);
      console.log('t222 ', token);
      if(token !== null) {
        console.log('load yourFeed')
        const { data } = yield call(articleService.feed, page - 1)
        yield put({
          type: 'saveArticle', 
          payload: { 
            data, 
            page, 
            tabActive: 'yourFeed'
          }
        })
      } else {
        const { data } = yield call(articleService.all, page - 1)
        console.log('load globalFeed')
        yield put({
          type: 'saveArticle', 
          payload: { 
            data, 
            page, 
            tabActive: 'globalFeed'
          }
        })
      }
    },
    *articlesAll({ payload: { page, tabActive } }, { call, put, select }) {
      const { data } = yield call(articleService.all, page - 1)
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
    },
    *articlesByAuthor({ payload: { author, page } }, { call, put }) {
      const { data } = yield call(articleService.byAuthor, author, page-1)
      console.log('articles by author ', data)
      yield put({
        type: 'saveArticle',
        payload: {
          data,
          page,
          tabActive: 'myArticles'
        }
      })
    },
    *favoritedArticles({ payload: { author, page } }, { call, put }) {
      const { data } = yield call(articleService.favoritedBy, author, page-1)
      yield put({
        type: 'saveArticle',
        payload: {
          data,
          page,
          tabActive: 'favoritedArticles'
        }
      })
    },
    *favorite({ payload: slug }, { call, put }) {
      const { data } = yield call(articleService.favorite, slug)
      console.log('favorite ', data)
      yield put({type: 'articleFavorite', payload: data })
    },
    *unFavorite({ payload: slug }, { call, put }) {
      const { data } = yield call(articleService.unfavorite, slug)
      console.log('unfavorite ', data)
      yield put({type: 'articleFavorite', payload: data })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        const reg = /\/profile@(.+)/;
        if(pathname === '/') {
          dispatch({type: 'articleLoad', payload: { page: 1 }})
          dispatch({type: 'getTags'})
        }
        if(reg.test(pathname)) {
          const author = reg.exec(pathname)[1];
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