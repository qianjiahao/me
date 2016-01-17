var React = require('react');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');
var { Link } = require('react-router');
var { msg, mixins } = require('iflux');
var StoreMixin = mixins.StoreMixin;
var store = require('./store.js');
var markdown = require('markdown').markdown;
var Image = require('../image/app.js');
var New = React.createClass({
  mixins: [StoreMixin(store)],

  render: function() {

    var data = store.data();
    
    return (
      <div>
        <div>
          <span className="bread">新建</span>
          <div style={Style.publish} onClick={this.publish}><i className="iconfont icon-publish" style={Style.big}></i>发布</div>
          <div style={Style.save} onClick={this.save}><i className="iconfont icon-save" style={Style.big}></i>草稿</div>
        </div>
        
        <div style={assgin({}, Style.group)}>
          <label>标题</label>
          <input type="text" placeholder="" style={assgin({}, Style.input)} value={data.get('title')} onChange={this.changeTitle}/>
        </div>

        <div style={Style.group}>
          <label>标签 <span style={Style.hint}>分隔符 |</span></label>
          <input type="text" placeholder="" style={assgin({}, Style.input)} value={data.get('tags')} onChange={this.changeTags}/>
        </div>
        
        <div style={Style.group}>
        <span style={assgin({}, Style.tab, (data.get('tab') == 0 ? Style.active : {}))} onClick={(e) => msg.emit('tab', 0)}><i className="iconfont icon-text"></i></span>
        <span style={assgin({}, Style.tab, (data.get('tab') == 1 ? Style.active : {}))} onClick={(e) => msg.emit('tab', 1)}><i className="iconfont icon-html"></i></span>
        <Image styles={Style.image} onFinish={this.finish}/>
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
  },
  finish(data) {
    console.log(data);
    msg.emit('insert_images', data);
  }
});

module.exports = New;