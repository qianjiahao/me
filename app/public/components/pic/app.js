var React = require('react');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');
var { msg, mixins } = require('iflux');
var StoreMixin = mixins.StoreMixin;
var store = require('./store.js');

var Pic = React.createClass({
  mixins: [StoreMixin(store)],

  getDefaultProps() {
    return {
      styles: {}
    }
  },
  render: function() {
    var data = store.data();

    return (
      <div style={this.props.styles}>
      <span onClick={() => msg.emit('toggle_panel', true)}><i className="iconfont icon-pic"></i></span>

        <div style={assgin({}, Style.panel, (data.get('toggle_panel') ? Style.open : {}))} draggable="true">
        <span onClick={() => msg.emit('toggle_panel', false)} style={Style.close}><i className="iconfont icon-close"></i></span>
          <span style={assgin({}, Style.tab, (data.get('tab') == 0 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 0)}><i className="iconfont icon-upload"></i></span>
          <span style={assgin({}, Style.tab, (data.get('tab') == 1 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 1)}><i className="iconfont icon-pic"></i></span>
        
          <div style={assgin({}, Style.content, (data.get('tab') == 0 ? Style.open : {}))} className="clearFix">
            <div style={Style.uploadsArea}  onClick={this.chooseFile}>
              <form ref="form" action="/uploads" method="post" encType="multipart/form-data" target="frameFile" style={Style.form}>
                <div style={Style.group}>
                  <input type="file" name="file" ref="file" multiple="multiple" onChange={this.submit}/>
                </div>
              </form>
              <iframe id='frameFile' name='frameFile' style={Style.frame}></iframe>
            </div>
          </div>
          <div style={assgin({}, Style.content, (data.get('tab') == 1 ? Style.open : {}))}>
            <div style={Style.pictureArea} className="clearFix">
              {data.get('list').size ? data.get('list').map((v, k) => {
                return (
                  <div style={Style.img} key={k}>
                    <img src={'uploads/' + v} width='100'/>
                  </div>
                );
              }) : (<h2>无图</h2>)}
            </div>
            <div style={Style.page}>

              {/* 上一页 */}
              <span style={assgin({}, Style.pre, Style.settings)}>
                <i className="iconfont icon-pre" onClick={() => msg.emit('toggle_page', data.get('currentPage') - 1)}></i>
                &nbsp;
                <a style={Style.settings} onClick={() => msg.emit('toggle_page', 1)}>1</a>
              </span>

              {/* 当前页 */}
              <span style={assgin({}, Style.current, Style.settings)}>{data.get('currentPage')}</span>

              {/* 下一页 */}
              <span style={assgin({}, Style.next, Style.settings)}>
                <a style={Style.settings} onClick={() => msg.emit('toggle_page', data.get('totalPage'))}>{data.get('totalPage')}</a>
                &nbsp;
                <i className="iconfont icon-next" onClick={() => msg.emit('toggle_page', data.get('currentPage') + 1)}></i>
              </span>
            </div>
            <div style={Style.pageRight}>
              <span style={Style.settings}><i style={Style.settings} className="iconfont icon-multi-select"></i></span>
              <span style={Style.settings} onClick={() => msg.emit('choose_picture')}><i style={Style.settings} className="iconfont icon-select"></i></span>
              <span style={Style.settings}><i style={Style.settings} className="iconfont icon-delete"></i></span>
            </div>
          </div>
        </div>
      </div>
    );
  },

  chooseFile(e) {
    this.refs.file.click();
  },
  submit() {
    if(document.querySelector("input[type=file]").value) {
      this.refs.form.submit();
    }
  }
});

module.exports = Pic;