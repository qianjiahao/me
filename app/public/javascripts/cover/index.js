var React = require('react');
var Style = require('./style.js');
var assign = require('javascripts/Object.assign.js');
var store = require('./store.js');
var { msg, mixins } = require('iflux');

var Cover = React.createClass({
  mixins: [mixins.StoreMixin(store)],

  componentDidMount() {
    msg.emit('cover:start', 0);
  },

  componentWillUnmount() {
    msg.emit('cover:clear');
  },

  render: function() {

    var data = store.data();
    var index = store.data().get('index');
    
    return (
      <div>
        {data.get('images').map((v, k) => {
          return (<div key={k} className="cover-img" style={assign({}, {backgroundImage: `url(${v})`}, Style.image, (index == k ? Style.show : Style.hide))} />)
        })}
        
        <div style={Style.nav}>
        {data.get('images').map((v, k) => {
          return (<i key={k} className="iconfont icon-dot" style={Style.dot} onClick={() => msg.emit('cover:start', k)}></i>)
        })}
        </div>
      </div>
    );
  }
});

module.exports = Cover;