var React = require('react');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');
var { Link } = require('react-router');

var New = React.createClass({

  render: function() {
    return (
      <div>
        <span className="bread">新建</span>
        <div style={Style.publish}>发布</div>
        <div style={Style.group}>
          <label>标题</label>
          <input type="text" placeholder="" style={assgin({}, Style.input)}/>
        </div>
        
        <div style={Style.group}>
          <label>标签 <span style={Style.hint}>分隔符 |</span></label>
          <input type="text" placeholder="" style={assgin({}, Style.input)}/>
        </div>
        <form action="/uploads" method="post" encType="multipart/form-data">
          <div style={Style.group}>
            <input type="file" name="file"/>
          </div>
          <button type="submit">upload</button>
        </form>
        <div style={Style.group}>
          <label>正文</label>
          <textarea placeholder="" style={assgin({}, Style.textArea)}/>
        </div>
        
      </div>
    );
  }

});

module.exports = New;