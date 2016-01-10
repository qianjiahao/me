var React = require('react');
var { render } = require('react-dom');
var { Router, Route, Link, browserHistory, IndexRoute } = require('react-router');

require('./public/stylesheets/style.css');
require('./public/icons/iconfont.css');

var Nav = require('./public/components/nav/app.js');
var Index = require('./public/components/index/app.js');
var Login = require('./public/components/login/app.js');
var Console = require('./public/components/console/app.js');
var Settings = require('./public/components/settings/app.js');
var New = require('./public/components/new/app.js');
var Dashboard = require('./public/components/dashboard/app.js');

var App = React.createClass({
  render () {
    return (
      <div>
        <Nav />
        <div style={{marginLeft: '40px'}}>{this.props.children}</div>
      </div>
    )
  }
})


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="index" component={Index} />
      <Route path="login" component={Login} />
      <Route path="console" component={Console}>
        <IndexRoute component={Dashboard} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="settings" component={Settings} />
        <Route path="new" component={New} />
      </Route>
    </Route>
  </Router>
), document.getElementById('content'));