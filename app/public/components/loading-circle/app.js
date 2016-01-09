var React = require('react');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');

var Circle = React.createClass({

  render() {
    return (
      <div style={Style.container}>
        <div style={assgin({}, Style.circle, Style.c0)}><div style={assgin({}, Style.dot, Style.d0)}></div></div>
        <div style={assgin({}, Style.circle, Style.c1)}><div style={assgin({}, Style.dot, Style.d1)}></div></div>
        <div style={assgin({}, Style.circle, Style.c2)}><div style={assgin({}, Style.dot, Style.d2)}></div></div>
        <div style={assgin({}, Style.circle, Style.c3)}><div style={assgin({}, Style.dot, Style.d3)}></div></div>
        <div style={assgin({}, Style.circle, Style.c4)}><div style={assgin({}, Style.dot, Style.d4)}></div></div>
        <div style={assgin({}, Style.circle, Style.c5)}><div style={assgin({}, Style.dot, Style.d5)}></div></div>
        <div style={assgin({}, Style.circle, Style.c6)}><div style={assgin({}, Style.dot, Style.d6)}></div></div>
        <div style={assgin({}, Style.circle, Style.c7)}><div style={assgin({}, Style.dot, Style.d7)}></div></div>
        <div style={assgin({}, Style.circle, Style.c8)}><div style={assgin({}, Style.dot, Style.d8)}></div></div>
      </div>
    );
  }
});

module.exports = Circle;