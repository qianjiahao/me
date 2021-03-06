var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var { msg, mixins } = require('iflux');
var assign = require('javascripts/Object.assign.js');
var markdown = require('markdown').markdown;
var Image = require('javascripts/image');

var Style = require('./style.js');
var store = require('./store.js');

var Writer = React.createClass({
  mixins: [mixins.StoreMixin(store), PureRenderMixin],

  componentDidMount() {
    var params = this.props.params;
    if(params.id) {
      msg.emit('writer:init', params.id);
    }
  },
  render: function() {

    var data = store.data();

    return (
      <div style={Style.container}>
        <div style={Style.bar}>
          <input type="text" style={assign({}, Style.title, Style.input)} value={data.get('title')} onChange={(e) => msg.emit('change_title', e.target.value)} placeholder="标题"/>
        </div>

        <div style={Style.content}>
          <div style={Style.content_bar}>
            <span style={assign({}, Style.tab, (data.get('tab') == 0 ? Style.active : {}))} onClick={(e) => msg.emit('toggle_tab', 0)}><i className="iconfont icon-text" style={Style.i}></i></span>
            <span style={assign({}, Style.tab, (data.get('tab') == 1 ? Style.active : {}))} onClick={(e) => msg.emit('toggle_tab', 1)}><i className="iconfont icon-html" style={Style.i}></i></span>
            <span style={assign({}, Style.tab)} onClick={this.image}><i className="iconfont icon-image" style={Style.i}></i></span>
            <div style={assign({}, Style.tab, Style.right)} onClick={() => msg.emit('publish')}><i className="iconfont icon-publish" style={Style.i}></i></div>
            <div style={assign({}, Style.tab, Style.right)} onClick={() => msg.emit('save')}><i className="iconfont icon-save" style={Style.i}></i></div>
          </div>
          <div style={Style.content_area}>
            {data.get('tab') == 0 
              ? (<textarea ref="text" style={Style.content_area_textarea} onChange={(e) => msg.emit('change_content', e.target.value)} value={data.get('m_content')}/>)
              : (<div style={Style.content_area_html} dangerouslySetInnerHTML={{__html: data.get('h_content')}}></div>)
            }
          </div>
        </div>
        <Image onFinish={this.finish}/>
      </div>
    );
  },

  image() {
    msg.emit('image:active', true, 'content');
    msg.emit('image:tab', 0);

  },

  finish(data, id) {
    msg.emit('select_image', data);
  }
});

module.exports = Writer;