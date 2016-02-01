var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var { msg, mixins } = require('iflux');
var Style = require('./style.js');

var Console = React.createClass({
  mixins: [PureRenderMixin],

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