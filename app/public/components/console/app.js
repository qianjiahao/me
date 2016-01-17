var React = require('react');
var { msg, mixins } = require('iflux');
var Style = require('./style.js');
var { Link } = require('react-router');
var assgin = require('../../javascripts/Object.assign.js');

var Console = React.createClass({

  componentWillMount() {
    msg.emit('checkLoginStatus');
  },

  render: function() {
    return (
      <div style={Style.container}>
        <div style={Style.wrapper}>{this.props.children}</div>
      </div>
    );
  }

});

module.exports = Console;