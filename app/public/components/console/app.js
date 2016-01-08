var React = require('react');
var { msg, mixins } = require('iflux');

var Console = React.createClass({

  componentWillMount() {
    msg.emit('checkLoginStatus');
  },

  render: function() {
    return (
      <div>
        <div>console tools</div>
        <div>title</div>
        <div>content</div>
      </div>
    );
  }

});

module.exports = Console;