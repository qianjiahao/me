var React = require('react');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');
var { Link } = require('react-router');

var New = React.createClass({

  render: function() {
    return (
      <div>
        <span className="bread">
          <Link to="/console" style={Style.a}>控制台</Link>
        </span>
        <span className="bread">新建</span>
        <span style={Style.publish}>发布</span>
        <div style={Style.group}>
          <label>标题</label>
          <input type="text" placeholder="" style={assgin({}, Style.input)}/>
        </div>
        
        <div style={Style.group}>
          <label>标签 <span style={Style.hint}>分隔符 |</span></label>
          <input type="text" placeholder="" style={assgin({}, Style.input)}/>
        </div>
        <div style={Style.group}>
          <label>正文</label>
          <textarea placeholder="" style={assgin({}, Style.textArea)}/>
        </div>
        
      </div>
    );
  }

});

module.exports = New;