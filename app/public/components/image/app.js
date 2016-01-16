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
      styles: {},
      onFinish: () => {}
    }
  },
  render: function() {
    var data = store.data();

    console.log(data && data.get('temp').toJS())

    var i = data.get('currentPage');
    var page = [i-3, i-2, i-1, i, i+1, i+2, i+3];

    return (
      <div style={this.props.styles}>
      <span onClick={() => msg.emit('toggle_panel', true)}><i className="iconfont icon-pic"></i></span>

        <div style={assgin({}, Style.panel, (data.get('toggle_panel') ? Style.open : {}))} draggable="true">
        <span onClick={() => msg.emit('toggle_panel', false)} style={Style.close}><i className="iconfont icon-close"></i></span>
          <span style={assgin({}, Style.tab, (data.get('toggle_tab') == 0 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 0)}><i className="iconfont icon-upload"></i></span>
          <span style={assgin({}, Style.tab, (data.get('toggle_tab') == 1 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 1)}><i className="iconfont icon-pic"></i></span>
        
          {/* [批量]上传图片 */}
          <div style={assgin({}, Style.content, (data.get('toggle_tab') == 0 ? Style.open : {}))} className="clearFix">
            <div style={Style.uploadsArea}  onClick={() => this.refs.file.click()}>
              <form ref="form" action="/image/upload" method="post" encType="multipart/form-data" target="frameFile" style={Style.form}>
                <div style={Style.group}>
                  <input type="file" name="file" ref="file" multiple="multiple" onChange={this.submit}/>
                </div>
              </form>
            </div>
            <iframe id='frameFile' name='frameFile' style={Style.frame}></iframe>
          </div>

          {/* 操作图片 */}
          <div style={assgin({}, Style.content, (data.get('toggle_tab') == 1 ? Style.open : {}))}>
            <div style={Style.pictureArea} className="clearFix">
              {data.get('result').size ? data.get('result').map((v, k) => {
                // 是否可选
                var selectable = data.get('toggle_select') ? Style.show : Style.hide;
                // 是否已被选中
                var selectStatus = data.get('temp').indexOf(v) !== -1;

                return (
                  <div style={assgin({}, Style.img)} key={k} onClick={() => msg.emit('select_image', v)}>
                    <span style={assgin({}, Style.selectIcon, selectable)}>
                      {selectStatus 
                        ? (<i className="iconfont icon-selected"></i>) 
                        : (<i className="iconfont icon-unselected"></i>)
                      }
                    </span>
                    <img src={'uploads/images/' + v} width='155'/>
                  </div>
                );
              }) : (<h2>无图</h2>)}
            </div>
            <span style={assgin({}, Style.pager, Style.pre)} className="page" onClick={() => msg.emit('toggle_page', parseInt(data.get('currentPage')) - 1)}><i className="iconfont icon-pre"></i></span>
            <span style={assgin({}, Style.pager, Style.next)} className="page"  onClick={() => msg.emit('toggle_page', parseInt(data.get('currentPage')) + 1)}><i className="iconfont icon-next"></i></span>
            <div style={Style.page}>
              {page.map((v) => {
                if(v > 0 && v <= data.get('totalPage')) {
                  return (<a style={assgin({}, Style.settings, (v == data.get('currentPage') ? Style.current : {}))} onClick={() => msg.emit('toggle_page', v)}>{v}</a>);
                }
              })}

              <span>total : {data.get('totalPage')}</span>
            </div>
            <div style={Style.pageRight}>
              {/* 多选 */}
              <span style={assgin({}, Style.settings, (data.get('toggle_select') ? Style.iconActive : {}))} onClick={() => msg.emit('toggle_select', data.get('toggle_select'))}><i style={Style.settings} className="iconfont icon-multi-select"></i></span>
              {/* 完成 */}
              <span style={Style.settings} onClick={this.finish}><i style={Style.settings} className="iconfont icon-select"></i></span>
              {/* 删除 */}
              <span style={Style.settings}><i style={Style.settings} className="iconfont icon-delete"></i></span>
            </div>
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

  finish() {
    this.props.onFinish(['data']);
  }
});

module.exports = Pic;