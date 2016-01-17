var React = require('react');
var { Link } = require('react-router');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');
var { msg, mixins } = require('iflux');
var store = require('./store.js');
var StoreMixin = mixins.StoreMixin;


var Nav = React.createClass({
  mixins: [StoreMixin(store)],

  componentDidMount() {
    msg.emit('checkLoginStatus');
  },
  render: function() {

    var data = store.data();

    return (
      <div style={Style.container}>

        <Link to="/index" style={assgin({}, Style.box, Style.logo, Style.a)}>Q</Link>
        
        {data && data.get('isLogin')
          ? (
            <div>
              <a href="javascript:;" style={assgin({}, Style.box, Style.login, Style.a)} onClick={() => msg.emit('logout')}>
                <i className="iconfont icon-logout"></i>
              </a>
              <Link to="/console" style={assgin({}, Style.box, Style.a)}>
                <i className="iconfont icon-home"></i>
              </Link>
              <Link to="/console/writer" style={assgin({}, Style.box, Style.a)}>
                <i className="iconfont icon-writer"></i>
              </Link>
            </div>
          ) 
          : (
            <Link to="/login" style={assgin({}, Style.box, Style.login, Style.a)}>
              <i className="iconfont icon-login"></i>
            </Link>
          )
        }        
      </div>
    );
  }

});

module.exports = Nav;