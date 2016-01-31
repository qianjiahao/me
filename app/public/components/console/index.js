var React = require('react');
var { msg, mixins } = require('iflux');
var Style = require('./style.js');
var PureRenderMixin = require('react-addons-pure-render-mixin');

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