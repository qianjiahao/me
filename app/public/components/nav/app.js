var React = require('react');
var { Link } = require('react-router');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');

var Nav = React.createClass({

  render: function() {
    return (
      <div style={Style.container} className="shadow-9">

        
        <div style={assgin({}, Style.box, Style.logo)}>
          <Link to="/index" style={Style.a}>Q</Link>
        </div>
        <div style={Style.box}>
        </div>
        <div style={assgin({}, Style.box, Style.login)}>
          <Link to="/login"><i className="iconfont icon-login"></i></Link>
        </div>
      </div>
    );
  }

});

module.exports = Nav;