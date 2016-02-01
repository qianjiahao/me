var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var { msg, mixins } = require('iflux');
var moment = require('moment');

var Style = require('./style.js');
var store = require('./store.js');

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