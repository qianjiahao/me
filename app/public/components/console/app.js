var React = require('react');
var { msg, mixins } = require('iflux');

var Console = React.createClass({

  componentWillMount() {
    msg.emit('checkLoginStatus');
  },

  render: function() {
    return (
      <div>
        console
      </div>
    );
  }

});

module.exports = Console;