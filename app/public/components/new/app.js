var React = require('react');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');
var { Link } = require('react-router');
var { msg, mixins } = require('iflux');
var StoreMixin = mixins.StoreMixin;
var store = require('./store.js');
var markdown = require('markdown').markdown;
var Pic = require('../pic/app.js');
var New = React.createClass({
  mixins: [StoreMixin(store)],

  render: function() {

    var data = store.data();

    var publishOpts = {};
    var unpublishOpts = {};
    
    publishOpts.checked = data.get('publish') == 1 ? "checked" : "";
    unpublishOpts.checked = data.get('publish') == 0 ? "checked" : "";
    
    return (
      <div>
        <span className="bread">新建</span>
        <div style={Style.create} onClick={this.create}>create</div>
        <div style={Style.group}>
          <label>标题</label>
          <input type="text" placeholder="" style={assgin({}, Style.input)} value={data.get('title')} onChange={this.changeTitle}/>
        </div>
        
        <div style={Style.group}>
          <label>标签 <span style={Style.hint}>分隔符 |</span></label>
          <input type="text" placeholder="" style={assgin({}, Style.input)} value={data.get('tags')} onChange={this.changeTags}/>
        </div>
        <div style={Style.group}>
          是否发布 
          <input type="radio" name="publish" value="1" {...publishOpts} onChange={this.changePublish}/>Y
          <input type="radio" name="publish" value="0" {...unpublishOpts} onChange={this.changePublish}/>N
        </div>
        <div style={Style.group}>
        <span style={assgin({}, Style.tab, (data.get('tab') == 0 ? Style.active : {}))} onClick={(e) => msg.emit('tab', 0)}>text</span>
        <span style={assgin({}, Style.tab, (data.get('tab') == 1 ? Style.active : {}))} onClick={(e) => msg.emit('tab', 1)}>toHTML</span>
        <Pic styles={Style.pic}/>
          {data.get('tab') == 0 ? (
            <textarea placeholder="" style={assgin({}, Style.textArea)} value={data.get('content')} onChange={this.changeContent}/>
          ) : (
            <div style={Style.htmlArea} dangerouslySetInnerHTML={{__html: markdown.toHTML(data.get('content'))}} />
          )}
          
        </div>
      </div>
    );
  },

  changeTitle(e) {
    msg.emit('changeTitle', e.target.value);
  },
  changeTags(e) {
    msg.emit('changeTags', e.target.value);
  },
  changePublish(e) {
    msg.emit('changePublish', e.target.value);
  },
  changeContent(e) {
    msg.emit('changeContent', e.target.value);
  },
  create() {
    msg.emit('create');
  }
});

module.exports = New;