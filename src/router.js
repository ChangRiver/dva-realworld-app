import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import isAuthenticated from './utils/isAuthenticated';
import HOC from './utils/HOC';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => isAuthenticated() ?
    <Component {...props} /> :
    <Redirect to={{pathname: '/login', state: { from: props.location }}}  />
  }/>
);



function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/editor',
      models: () => [import('./models/articleEditor')],
      component: () => import('./routes/ArticleEditor/ArticleEditor')
    },
    {
      path: '/editor/:slug',
      models: () => [import('./models/articleEditor'), import('./models/articleDetail')],
      component: () => import('./routes/ArticleEditor/ArticleEditor')
    },
    {
      path: '/settings',
      component: () => import('./routes/Settings/Settings')
    },
    {
      path: '/profile@:id',
      models: () => [import('./models/profile'), import('./models/article')],
      component: () => import('./routes/Profile/Profile')
    }
  ];
  const Login = dynamic({
    app,
    component: () => import('./routes/Login/Login'),
  });
  const Register = dynamic({
    app,
    component: () => import('./routes/Register/Register'),
  });
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={dynamic({
          app,
          models: () => [import('./models/article')],
          component: () => import('./routes/IndexPage')
        })} />
        <Route path="/login" component={HOC(Login)}/>
        <Route path="/register" component={HOC(Register)}/>
        <Route path="/article/:id" component={dynamic({
          app,
          models: () => [import('./models/articleDetail')],
          component: () => import('./routes/ArticleDetail/ArticleDetail')
        })} />
        {
          routes.map(({ path, ...dynamics }, key) => (
            <PrivateRoute exact key={key} path={path} component={dynamic({
              app,
              ...dynamics
            })} />
          ))
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
