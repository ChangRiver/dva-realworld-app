import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import { message } from 'antd';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e) {
    console.log('err ', e)
    // message.error('error happen!')
  },
  onAction: createLogger()
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
