var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var { msg, mixins } = require('iflux');
var assign = require('javascripts/Object.assign.js');

var Style = require('./style.js');
var store = require('./store.js');

var Login = React.createClass({
  mixins: [mixins.StoreMixin(store), PureRenderMixin],

  render: function() {

    var data = store.data();

    return (
      <div style={Style.container}>
        <div style={Style.title}>in</div>

        <div>
          <div style={Style.group}>
            <div style={Style.icon}>
              <i className="iconfont icon-user"></i>
            </div>
            <div>
              <input style={Style.input} type="text" placeholder="用户名" onChange={(e) => msg.emit('changeUsername', e.target.value)} value={data.get('username')}/>
            </div>
          </div>
          <div style={Style.group}>
            <div style={Style.icon}>
              <i className="iconfont icon-password"></i>
            </div>
            <div>
              <input style={Style.input} type="password" placeholder="密码" onChange={(e) => msg.emit('changePassword', e.target.value)} value={data.get('password')}/>
            </div>
          </div>
        </div>
        <div style={Style.group}>
          <div style={Style.authCode}>
            <img src="/authCode" style={{'WebkitUserSelect': 'none'}} width="230"/>
          </div>
        </div>
        <div style={Style.group}>
          <input style={Style.authInput} type="text" placeholder="验证码" onChange={(e) => msg.emit('changeAuthCode', e.target.value)} value={data.get('authCode')} onKeyDown={this.keydown}/>
        </div>
        <div style={Style.group}>
          <div style={Style.submit} className="hoverBtn" onClick={() => msg.emit('login')}>submit</div>
        </div>

        <div style={assign({}, Style.group, Style.msg)}>{data && data.get('msg')}</div>
      </div>
    );
  },

  keydown(e) {
    if(e.keyCode == 13) {
      msg.emit('login');
    }
  }
});

module.exports = Login;