const React = require('react');
const { render } = require('react-dom');
const { Router, Route, browserHistory, IndexRoute } = require('react-router');

require('./public/stylesheets/style.css');
require('./public/icons/iconfont.css');

const Nav = require('./public/components/nav');
const Index = require('./public/components/index');
const Login = require('./public/components/login');
const Console = require('./public/components/console');
const Writer = require('./public/components/writer');
const Dashboard = require('./public/components/dashboard');
const Doc = require('./public/components/doc');

const App = React.createClass({
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Nav />
        <div style={{ marginLeft: '40px', overflowX: 'hidden', height: '100%' }}>
            {this.props.children}
        </div>
      </div>
    );
  },
});


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="login" component={Login} />
      <Route path="index" component={Index} />
      <Route path="doc/:id" component={Doc} />
      <Route path="console" component={Console}>
        <IndexRoute component={Writer} />
        <Route path="writer" component={Writer} />
        <Route path="writer/:id" component={Writer} />
        <Route path="dashboard" component={Dashboard} />
      </Route>
    </Route>
  </Router>
 ), document.getElementById('content'));