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

    console.log(data && data.toJS());

    return (
      <div>
        <div style={Style.title}>in</div>

        <div>
          <div style={Style.group}>
            <div style={Style.icon}>
              <i className="iconfont icon-user"></i>
            </div>
            <div>
              <input style={Style.input} type="text" />
            </div>
          </div>
          <div style={Style.group}>
            <div style={Style.icon}>
              <i className="iconfont icon-password"></i>
            </div>
            <div>
              <input style={Style.input} type="password" />
            </div>
          </div>
        </div>
        <div style={Style.group}>
          <div style={Style.authCode}>
            <img src="/authCode" style={{'WebkitUserSelect': 'none'}} width="230"/>
          </div>
        </div>
        <div style={Style.group}>
          <input style={Style.authInput} type="text"/>
        </div>
        <div style={Style.group}>
          <div style={Style.submit} className="hoverBtn">submit</div>
        </div>

        <div style={assgin({}, Style.group, Style.msg)}>{data && data.get('msg')}</div>
      </div>
    );
  }

});

module.exports = Login;