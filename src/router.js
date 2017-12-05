import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (1 == true) ?
    <Component {...props} /> :
    <Redirect to={{pathname: '/login', state: { from: props.location }}}  />
  }/>
);

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: () => import('./routes/IndexPage')
    }
  ];
  
  return (
    <Router history={history}>
      <Switch>
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
