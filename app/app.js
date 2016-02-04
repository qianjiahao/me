var React = require('react');
var { render } = require('react-dom');
var { Router, Route, Link, browserHistory, IndexRoute } = require('react-router');

require('./public/stylesheets/style.css');
require('./public/icons/iconfont.css');

var Nav = require('./public/components/nav');
var Index = require('./public/components/index/index');
var Login = require('./public/components/login');
var Console = require('./public/components/console');
var Writer = require('./public/components/writer');
var Dashboard = require('./public/components/dashboard');
var Doc = require('./public/components/doc');

var App = React.createClass({
  render () {
    return (
      <div style={{height: '100%'}}>
        <Nav />
        <div style={{marginLeft: '40px', overflowX: 'hidden', height: '100%'}}>{this.props.children}</div>
      </div>
    )
  }
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