var React = require('react');
var Style = require('./style.js');
var store = require('./store.js');
var assgin = require('../../javascripts/Object.assign.js');
var { msg, mixins } = require('iflux');
var StoreMixin = mixins.StoreMixin;

var Login = React.createClass({
  mixins: [StoreMixin(store)],

  render: function() {

    var data = store.data();

    return (
      <div>
        <div style={Style.title}>in</div>

        <div>
          <div style={Style.group}>
            <div style={Style.icon}>
              <i className="iconfont icon-user"></i>
            </div>
            <div>
              <input style={Style.input} type="text" placeholder="用户名" onChange={(e) => msg.emit('changeUsername', e.target.value)}/>
            </div>
          </div>
          <div style={Style.group}>
            <div style={Style.icon}>
              <i className="iconfont icon-password"></i>
            </div>
            <div>
              <input style={Style.input} type="password" placeholder="密码" onChange={(e) => msg.emit('changePassword', e.target.value)}/>
            </div>
          </div>
        </div>
        <div style={Style.group}>
          <div style={Style.authCode}>
            <img src="/authCode" style={{'WebkitUserSelect': 'none'}} width="230"/>
          </div>
        </div>
        <div style={Style.group}>
          <input style={Style.authInput} type="text" placeholder="验证码" onChange={(e) => msg.emit('changeAuthCode', e.target.value)}/>
        </div>
        <div style={Style.group}>
          <div style={Style.submit} className="hoverBtn" onClick={() => msg.emit('login')}>submit</div>
        </div>

        <div style={assgin({}, Style.group, Style.msg)}>{data && data.get('msg')}</div>
      </div>
    );
  }
});

module.exports = Login;