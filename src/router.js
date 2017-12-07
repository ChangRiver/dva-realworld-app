import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import isAuthenticated from './utils/isAuthenticated';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => isAuthenticated() ?
    <Component {...props} /> :
    <Redirect to={{pathname: '/login', state: { from: props.location }}}  />
  }/>
);

function RouterConfig({ history, app }) {
  const routes = [
  
  ];
  
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={dynamic({
          app,
          models: () => [import('./models/article')],
          component: () => import('./routes/IndexPage')
        })} />
        <Route path="/login" component={dynamic({
          app,
          component: () => import('./routes/Login/Login')
        })} />
        <Route path="/register" component={dynamic({
          app,
          component: () => import('./routes/Register/Register')
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
