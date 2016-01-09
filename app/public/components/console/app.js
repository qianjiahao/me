var React = require('react');
var { msg, mixins } = require('iflux');
var Style = require('./style.js');

var Console = React.createClass({

  componentWillMount() {
    msg.emit('checkLoginStatus');
  },

  render: function() {
    return (
      <div style={Style.container}>
        <div style={Style.tools}>console tools</div>
        <div style={Style.title}>
          <input type="text" style={Style.input}/>
        </div>
        <div style={Style.content}>content</div>
      </div>
    );
  }

});

module.exports = Console;