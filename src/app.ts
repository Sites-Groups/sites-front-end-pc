import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './global.less';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
const models = ['user'];
models.forEach((item) => app.model(require(`./models/${item}.ts`).default));

// 4. Router
app.router(require('./router/index.tsx').default);

// 5. Start
app.start('#sites');
