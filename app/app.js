var React = require('react');
var { render } = require('react-dom');
var { Router, Route, Link, browserHistory, IndexRoute } = require('react-router');

require('./public/stylesheets/style.css');
require('./public/icons/iconfont.css');

var Nav = require('./public/components/nav/app.js');
var Index = require('./public/components/index/app.js');
var Login = require('./public/components/login/app.js');
var Console = require('./public/components/console/app.js');
var Writer = require('./public/components/writer/app.js');
var Dashboard = require('./public/components/dashboard');

var App = React.createClass({
  render () {
    return (
      <div>
        <Nav />
        <div style={{marginLeft: '40px', overflowX: 'hidden'}}>{this.props.children}</div>
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
        <IndexRoute component={Writer} />
        <Route path="writer" component={Writer} />
        <Route path="writer/:id" component={Writer} />
        <Route path="dashboard" component={Dashboard} />
      </Route>
    </Route>
  </Router>
), document.getElementById('content'));