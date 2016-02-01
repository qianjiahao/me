var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var { Link } = require('react-router');
var assign = require('javascripts/Object.assign.js');
var { msg, mixins } = require('iflux');

var Style = require('./style.js');
var store = require('./store.js');

var Nav = React.createClass({
  mixins: [mixins.StoreMixin(store), PureRenderMixin],

  componentDidMount() {
    msg.emit('checkLoginStatus');
  },
  
  render: function() {

    var data = store.data();

    return (
      <div style={Style.container}>

        <Link to="/index" style={assign({}, Style.box, Style.logo, Style.a)}>Q</Link>
        
        {data && data.get('isLogin')
          ? (
            <div>
              <a href="javascript:;" style={assign({}, Style.box, Style.login, Style.a)} onClick={() => msg.emit('logout')}>
                <i className="iconfont icon-logout"></i>
              </a>
              <Link to="/console/writer" style={assign({}, Style.box, Style.a)}>
                <i className="iconfont icon-writer"></i>
              </Link>
              <Link to="/console/dashboard" style={assign({}, Style.box, Style.a)}>
                <i className="iconfont icon-dashboard"></i>
              </Link>
            </div>
          ) 
          : (
            <Link to="/login" style={assign({}, Style.box, Style.login, Style.a)}>
              <i className="iconfont icon-login"></i>
            </Link>
          )
        }        
      </div>
    );
  }

});

module.exports = Nav;