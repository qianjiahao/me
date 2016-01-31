var React = require('react');
var Style = require('./style.js');
var { msg, mixins } = require('iflux');
var store = require('./store.js');
var moment = require('moment');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Doc = React.createClass({
  mixins: [mixins.StoreMixin(store), PureRenderMixin],

  componentDidMount() {
    msg.emit('doc:init', this.props.params.id);
  },

  render: function() {
    var data = store.data() && store.data();

    return (
      <div style={Style.container}>
        <div style={Style.title}>{data.getIn(['doc', 'title'])}</div>
        <span style={Style.modify_date}>{moment(data.getIn(['doc', 'modify_date'])).fromNow()}</span>
        <div style={Style.content} dangerouslySetInnerHTML={{__html: data.getIn(['doc', 'h_content'])}}></div>
      </div>
    );
  }

});

module.exports = Doc;