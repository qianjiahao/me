var React = require('react');
var Style = require('./style.js');
var assign = require('javascripts/Object.assign.js');
var store = require('./store.js');
var { msg, mixins } = require('iflux');

var Image = React.createClass({
  mixins: [mixins.StoreMixin(store)],

  getDefaultProps() {
    return {
      styles: {},
      onFinish: () => {}
    }
  },

  componentDidMount() {
    msg.emit('image:tab', 0);
  },

  render: function() {

    var data = store.data();
    var active = data.get('active');
    var tab = data.get('tab');
    var images = data.get('images');
    var selected = data.get('selected');
    var currentPage = data.get('currentPage');
    var totalPage = data.get('totalPage');

    return (
      <div style={assign({}, Style.container, this.props.styles, (active ? Style.show : Style.hide))}>
        {/* 头部 */}
        <div style={Style.topBar}>
          <span style={assign({}, Style.left, Style.fontSize22)}>选择图片</span>
          <span style={assign({}, Style.right)} onClick={() => msg.emit('image:active', false)}><i className="iconfont icon-close" style={Style.fontSize22}></i></span>
        </div>

        {/* 左边 tab */}
        <div style={Style.leftAside}>
          <i className="iconfont icon-image color-hover" style={assign({}, Style.tab, Style.left, (tab == 0 ? Style.activeTab : {}))} onClick={() => msg.emit('image:tab', 0)}></i>
          <i className="iconfont icon-upload color-hover" style={assign({}, Style.tab, Style.left, (tab == 1 ? Style.activeTab : {}))} onClick={() => msg.emit('image:tab', 1)}></i>
        </div>

        {/* 内容 content */}
        <div style={Style.content}>
          {tab == 0 
            ? (
                <div style={Style.imageContent} className="clearFix">
                  <div style={assign({}, Style.pageBtn, Style.pagePre)} className="page" onClick={() => msg.emit('image:page', data.get('currentPage') - 1)}><i className="iconfont icon-pre"></i></div>
                  <div className="clearFix">
                    {/* 图片 */}
                    {images.map((v, k) => {

                      var s = selected.indexOf(v) != -1;

                      return (
                        <div style={Style.box} key={k} onClick={() => msg.emit('image:select', v)}>
                        <div style={assign({}, Style.boxTop, (s ? Style.show : Style.hide))}><i className="iconfont icon-done" style={Style.boxIcon}></i></div>
                          <img src={`uploads/images/${v}`} width="100%"/>
                        </div>
                      )
                    })}
                  </div>
                  <div style={assign({}, Style.pageBtn, Style.pageNext)} className="page" onClick={() => msg.emit('image:page', data.get('currentPage') + 1)}><i className="iconfont icon-next"></i></div>

                  <div style={Style.pageInfo}>{`${currentPage}/${totalPage}`}<i className="iconfont icon-delete" style={Style.paddingLeft} onClick={() => msg.emit('image:remove')}></i></div>
                  <div style={Style.finish} onClick={this.finish}>完成</div>
                </div>
              ) 
            : (
                <div style={Style.uploadContent}>
                  {/* 上传 */}
                  <iframe src="views/upload.html" style={Style.iframe}></iframe>
                </div>
              )
          }
        </div>
      </div>
    );
  },

  finish() {
    var data =  store.data().get('selected');
    var id = store.data().get('id');

    if(data.size) {
      this.props.onFinish(data.toJS(), id);
      msg.emit('image:token', '');

    }
    msg.emit('image:active', false);
  }

});

module.exports = Image;