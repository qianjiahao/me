var React = require('react');
var Style = require('./style.js');
var { msg, mixins } = require('iflux');
var store = require('./store.js');
var Image = require('../image/app.js');

var StoreMixin = mixins.StoreMixin;

var Writer = React.createClass({
  mixins: [StoreMixin(store)],

  render: function() {
    return (
      <div>

        this is writer section .
        <Image />
      </div>
    );
  }

});

module.exports = Writer;