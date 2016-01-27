var React = require('react');
var Style = require('./style.js');
var { msg, mixins } = require('iflux');
var store = require('./store.js');


var Doc = React.createClass({
  mixins: [mixins.StoreMixin(store)],

  componentDidMount() {
    msg.emit('doc:init', this.props.params.id);
  },

  render: function() {
    var data = store.data() && store.data();

    return (
      <div style={Style.container}>
        <div style={Style.title}>{data.getIn(['data', 'title'])}</div>
        <div dangerouslySetInnerHTML={{__html: data.getIn(['data', 'h_content'])}}></div>
      </div>
    );
  }

});

module.exports = Doc;