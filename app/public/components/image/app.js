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

    var i = data.get('currentPage');
    var page = [i-3, i-2, i-1, i, i+1, i+2, i+3];

    return (
      <div style={this.props.styles}>
      <span onClick={() => msg.emit('toggle_panel', true)}><i className="iconfont icon-image" style={Style.i}></i></span>

        <div style={assgin({}, Style.panel, (data.get('toggle_panel') ? Style.open : {}))} draggable="true">
          <span style={Style.close} onClick={() => msg.emit('toggle_panel', false)}><i className="iconfont icon-close" style={Style.i}></i></span>
          <span style={assgin({}, Style.tab, (data.get('toggle_tab') == 0 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 0)}><i className="iconfont icon-upload" style={Style.i}></i></span>
          <span style={assgin({}, Style.tab, (data.get('toggle_tab') == 1 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 1)}><i className="iconfont icon-image" style={Style.i}></i></span>
        
          {/* [批量]上传图片 */}
          <div style={assgin({}, Style.content, (data.get('toggle_tab') == 0 ? Style.open : {}))} className="clearFix">
            <div style={Style.uploadsArea}  onClick={this.upload}>
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
                        ? (<i className="iconfont icon-selected" style={assgin({}, Style.i, Style.orange)}></i>) 
                        : (<i className="iconfont icon-unselected" style={assgin({}, Style.i, Style.orange)}></i>)
                      }
                    </span>
                    <img src={'uploads/images/' + v} width='155'/>
                  </div>
                );
              }) : (<h2>无图</h2>)}
            </div>
            <span style={assgin({}, Style.pager, Style.pre)} className="page" onClick={() => msg.emit('toggle_page', parseInt(data.get('currentPage')) - 1)}><i className="iconfont icon-pre" style={Style.i}></i></span>
            <span style={assgin({}, Style.pager, Style.next)} className="page"  onClick={() => msg.emit('toggle_page', parseInt(data.get('currentPage')) + 1)}><i className="iconfont icon-next" style={Style.i}></i></span>
            <div style={Style.page}>
              {page.map((v, k) => {
                if(v > 0 && v <= data.get('totalPage')) {
                  return (<a key={k} style={assgin({}, Style.settings, Style.i, (v == data.get('currentPage') ? Style.current : {}))} onClick={() => msg.emit('toggle_page', v)}>{v}</a>);
                }
              })}

              <span>Total {<a style={assgin({}, Style.settings, Style.i)} onClick={() => msg.emit('toggle_page', data.get('totalPage'))}>{data.get('totalPage')}</a>}</span>
            </div>
            <div style={Style.pageRight}>
              {/* 多选 */}
              <span style={assgin({}, Style.settings, (data.get('toggle_select') ? Style.orange : {}))} onClick={() => msg.emit('toggle_select', data.get('toggle_select'))}><i style={Style.settings} className="iconfont icon-multi-select" style={Style.i}></i></span>
              {/* 完成 */}
              <span style={Style.settings} onClick={this.finish}><i style={assgin({}, Style.settings, Style.i)} className="iconfont icon-select"></i></span>
              {/* 删除 */}
              <span style={Style.settings} onClick={this.remove}><i style={assgin({}, Style.settings, Style.i)} className="iconfont icon-delete"></i></span>
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
  upload() {
    this.refs.file.click();
  },

  finish() {
    this.props.onFinish(store.data().get('temp').toJS());
  },

  remove() {
    msg.emit('remove_images');
  }
});

module.exports = Pic;