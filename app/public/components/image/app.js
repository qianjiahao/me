var React = require('react');
var Style = require('./style.js');
var assgin = require('javascripts/Object.assign.js');
var { msg, mixins } = require('iflux');
var StoreMixin = mixins.StoreMixin;
var store = require('./store.js');
require('../../stylesheets/uploadfile.css');

var Image = React.createClass({
  mixins: [StoreMixin(store)],

  getDefaultProps() {
    return {
      styles: {},
      onFinish: () => {}
    }
  },

  componentDidMount() {
    msg.emit('toggle_tab', 0);

    $(document).ready(function () {
      $("#upload").uploadFile({
        url: "/image/upload",
        multiple: true,
        dragDrop: true,
        fileName: '123.jpg',

      }); 
    })
  },
  render: function() {
    var data = store.data();

    var i = data.get('currentPage');
    var page = `[${i}/${data.get('totalPage')}]`;

    return (
      <div style={this.props.styles}>
      <span onClick={() => msg.emit('toggle_panel', true)}><i className="iconfont icon-image" style={Style.initial}></i></span>

        <div style={assgin({}, Style.panel, (data.get('toggle_panel') ? Style.open : {}))} draggable="true">
          <span style={Style.close} onClick={() => msg.emit('toggle_panel', false)}><i className="iconfont icon-close" style={Style.i}></i></span>
          <span style={assgin({}, Style.tab, (data.get('tab') == 0 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 0)}><i className="iconfont icon-image" style={Style.i}></i></span>
          <span style={assgin({}, Style.tab, (data.get('tab') == 1 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 1)}><i className="iconfont icon-upload" style={Style.i}></i></span>
        
          {/* 操作图片 */}
          <div style={assgin({}, Style.content, (data.get('tab') == 0 ? Style.open : {}))}>
            <div style={Style.pictureArea} className="clearFix">
              {data.get('result').size ? data.get('result').map((v, k) => {
                // 是否已被选中
                var selectStatus = data.get('temp').indexOf(v) !== -1;
                return (
                  <div style={assgin({}, Style.img)} key={k} onClick={() => msg.emit('select_image', v)}>
                    <div style={assgin({}, Style.selected, (selectStatus ? Style.show : Style.hide))}>
                      <i className="iconfont icon-done" style={Style.selected_icon}></i>
                    </div>
                    <img src={'uploads/images/' + v} width='155'/>
                  </div>
                );
              }) : (<h2>无图</h2>)}
            </div>
            <span style={assgin({}, Style.pager, Style.pre)} className="page" onClick={() => msg.emit('toggle_page', parseInt(data.get('currentPage')) - 1)}><i className="iconfont icon-pre" style={Style.i}></i></span>
            <span style={assgin({}, Style.pager, Style.next)} className="page"  onClick={() => msg.emit('toggle_page', parseInt(data.get('currentPage')) + 1)}><i className="iconfont icon-next" style={Style.i}></i></span>
            <div style={Style.operator}>
              {/* 分页 */}
              <span style={assgin({}, Style.settings, Style.i)}>{page}</span>
              {/* 完成 */}
              <a style={Style.settings} onClick={this.finish}>完成</a>
              {/* 删除 */}
              <span style={Style.settings} onClick={this.remove}><i style={assgin({}, Style.settings, Style.i)} className="iconfont icon-delete"></i></span>
            </div>
          </div>

          {/* [批量]上传图片 */}
          <div style={assgin({}, Style.content, (data.get('tab') == 1 ? Style.open : {}))} className="clearFix">
            <div id="upload">upload</div>
        
          </div>
        </div>
      </div>
    );
  },

  submit() {
    if(document.querySelector("input[type=file]").value) {
      this.refs.form.submit();
    }
  },
  upload() {
    this.refs.file.click();
  },

  finish() {
    if(store.data().get('temp').size) {
      this.props.onFinish(store.data().get('temp').toJS());
    }
  },

  remove() {
    msg.emit('remove_images');
  }
});

module.exports = Image;